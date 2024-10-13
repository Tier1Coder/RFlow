import os
import lxml.etree as etree
from django.db import transaction
from django.http import JsonResponse, HttpResponse, Http404
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import BPMNDiagram
from .serializers import BPMNDiagramSerializer
from utils.bpmn_parser import BPMNParser
from utils.exceptions import DocumentInvalidError, ElementIdDuplicatedError


class BPMNDiagramView(viewsets.ModelViewSet):
    """
    This class represents CRUD (Create, Read, Update, Delete) operations of BPMN diagrams with extra actions.

    Attributes:
        serializer_class (BPMNDiagramSerializer): The serializer class for BPMNDiagram.
        queryset (QuerySet): The queryset for retrieving BPMNDiagram objects.

    Methods:
        create(request, *args, **kwargs): Creates a new BPMN diagram instance.
        update(request, *args, **kwargs): Updates an existing BPMN diagram instance.
        destroy(request, *args, **kwargs): Deletes an existing BPMN diagram instance and its associated file.
        view_file(request, pk=None): Returns the file associated with the BPMN diagram as an HTTP response.
        delete_file(request, pk=None): Deletes the file associated with the BPMN diagram.
        visualize_diagram(request, pk=None): Visualizes the BPMN diagram by parsing its XML content.
    """
    serializer_class = BPMNDiagramSerializer
    queryset = BPMNDiagram.objects.all()
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer: BPMNDiagramSerializer):
        serializer.save()

    def perform_update(self, serializer: BPMNDiagramSerializer):
        serializer.save()

    def perform_destroy(self, instance: BPMNDiagram):
        try:
            file_path = instance.file.path
            if os.path.exists(file_path):
                os.remove(file_path)
        except ValueError:  # When 'file' attribute has no file associated with it, delete anyway.
            pass
        instance.delete()

    def create(self, request, *args, **kwargs) -> Response:
        """
        Creates a new BPMN diagram instance.

        Args:
            request (Request): The HTTP request object containing the data for the new BPMN diagram.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.

        Returns:
            Response: A response containing the serialized data of the created BPMN diagram,
                      or an error message if the creation fails.
        """
        serializer = self.get_serializer(data=request.data)

        with transaction.atomic():
            if serializer.is_valid(raise_exception=True):
                self.perform_create(serializer)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs) -> Response:
        """
        Updates an existing BPMN diagram instance.

        Args:
            request (Request): The HTTP request object containing the updated data for the BPMN diagram.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.

        Returns:
            Response: A response containing the serialized data of the updated BPMN diagram,
                      or an error message if the update fails.
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)

        with transaction.atomic():
            if serializer.is_valid(raise_exception=True):
                self.perform_update(serializer)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs) -> Response:
        """
         Deletes an existing BPMN diagram instance and its associated file.

         Args:
             request (Request): The HTTP request object.
             *args: Additional positional arguments.
             **kwargs: Additional keyword arguments.

         Returns:
             Response: A response with HTTP 204 NO CONTENT status if the deletion is successful,
                       or an error message if the file could not be found.
         """
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['get'], url_path='view_file')
    def view_file(self, request, pk=None) -> HttpResponse:
        """
        Returns the file associated with the BPMN diagram as an HTTP response.

        Args:
            request (Request): The HTTP request object.
            pk (str, optional): The primary key of the BPMNDiagram instance.

        Returns:
            HttpResponse: The file content with the appropriate content type and disposition,
                          or a 404 response if the file is not found.
        """
        _ = (request, pk)
        diagram = self.get_object()
        file_path = diagram.file.path
        if os.path.exists(file_path):
            with open(file_path, 'r') as file:
                response = HttpResponse(file.read(), content_type='application/xml')
                response['Content-Disposition'] = f'inline; filename={diagram.file.name}'
                return response
        raise Http404("File not found")

    @action(detail=True, methods=['delete'], url_path='delete_file')
    def delete_file(self, request, pk=None) -> Response:
        """
        Deletes the file associated with the BPMN diagram.

        Args:
            request (Request): The HTTP request object.
            pk (str, optional): The primary key of the BPMNDiagram instance.

        Returns:
            Response: A response with HTTP 204 NO CONTENT status if the file deletion is successful,
                      or an error message if the file could not be found.
        """
        _ = (request, pk)
        diagram = self.get_object()
        file_path = diagram.file.path
        if os.path.exists(file_path):
            os.remove(file_path)
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({"error": "File not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['get'], url_path='visualize')
    def visualize_diagram(self, request, pk=None):
        """
        Visualizes the BPMN diagram by parsing its XML content.

        Args:
            request (Request): The HTTP request object.
            pk (str, optional): The primary key of the BPMNDiagram instance.

        Returns:
            Response: A response containing the parsed JSON data of the BPMN diagram,
                      or an error message if the file could not be found.
        """
        _ = (request, pk)
        diagram = self.get_object()
        xml_file_path = diagram.file.path
        if os.path.exists(xml_file_path):
            try:
                bpmn_factory = BPMNParser(xml_file_path)
                parsed_json_data = bpmn_factory.parse()
                return Response({"xml_content": parsed_json_data}, status=status.HTTP_200_OK)

            # Custom exceptions
            except DocumentInvalidError as e:
                return Response({
                    "error": e.message,
                    "line": e.line,
                    "column": e.column,
                }, status=status.HTTP_400_BAD_REQUEST)
            except ElementIdDuplicatedError as e:
                return Response({
                    "error": e.message,
                    "duplicatedIds": e.duplicated_ids
                }, status=status.HTTP_400_BAD_REQUEST)

            # lxml exceptions
            except etree.XMLSyntaxError as e:
                return Response({
                    "error": e.msg,
                    "line": e.lineno
                }, status=status.HTTP_400_BAD_REQUEST)

        return Response({"error": "File not found"}, status=status.HTTP_404_NOT_FOUND)


@ensure_csrf_cookie
def get_csrf_token() -> JsonResponse:
    """
    Sets the CSRF cookie and returns a JSON response.

    Returns:
        JsonResponse: A response indicating that the CSRF cookie has been set.
    """
    return JsonResponse({'message': 'CSRF cookie set'})
