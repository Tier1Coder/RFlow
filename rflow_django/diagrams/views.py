from django.shortcuts import render, redirect
from .forms import BPMNFileForm
from .models import BPMNFile


# TODO: import script from utils and visualize

def upload_new_file(request):
    if request.method == 'POST':
        form = BPMNFileForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('diagrams:upload_new_file')
    else:
        form = BPMNFileForm()
    return render(request, 'diagrams/upload_new_file.html', {'form': form})


def view_created_diagram(request):
    # TODO
    pass


def view_all(request):
    # TODO
    diagrams = BPMNFile.objects.all()
    return render(request, 'diagrams/view_all.html', {'diagrams': diagrams})
