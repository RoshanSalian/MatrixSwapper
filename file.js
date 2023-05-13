var draggedElement = null;
var dragoverElement = null;
var draggableElements = document.getElementsByClassName('draggable');
var swapHistory = []
var undoButton = document.getElementById('undo');
undoButton.disabled = true;

for (var i = 0; i < draggableElements.length; i++) {
    draggableElements[i].addEventListener('dragstart', function(event) {
        draggedElement = event.target;
        draggedElement.classList.add('dragging');
    });
} 

var allCells = document.getElementsByTagName('td');
for (var i = 0; i < allCells.length; i++) {
    allCells[i].addEventListener('dragover', function(event) {
        event.preventDefault();
    });

    allCells[i].addEventListener('drop', function(event) {
        if (draggedElement != null) {
            var targetElement = event.target;

            var sourceClass = draggedElement.classList[1]
            var targetClass = targetElement.classList[1]

            var beforeSwap = { 
                sourceElement: sourceClass,
                targetElement: targetClass
            };
            

            draggedElement.classList.remove(sourceClass)
            draggedElement.classList.add(targetClass)
            targetElement.classList.remove(targetClass)
            targetElement.classList.add(sourceClass)

            draggedElement.classList.remove('dragging')
            targetElement.classList.remove('dragging')

            var temp = draggedElement.innerHTML
            draggedElement.innerHTML = targetElement.innerHTML;
            targetElement.innerHTML = temp

            var afterSwap = { // create object to represent before and after states of swap
                sourceElement: targetClass,
                targetElement: sourceClass
            };
            swapHistory.push({before: beforeSwap, after: afterSwap});

            if (swapHistory.length > 0) {
                undoButton.disabled = false;
            }
        }
    });
}


undoButton.addEventListener('click', function() {
    if (swapHistory.length > 0) {
        var lastSwap = swapHistory.pop(); // remove last swap from history
        var sourceClass = lastSwap.before.sourceElement;
        var targetClass = lastSwap.before.targetElement;

        var sourceElement = document.getElementsByClassName(sourceClass)[0];
        var targetElement = document.getElementsByClassName(targetClass)[0];

        sourceElement.classList.remove(sourceClass);
        sourceElement.classList.add(targetClass);
        targetElement.classList.remove(targetClass);
        targetElement.classList.add(sourceClass);

        var temp = sourceElement.innerHTML;
        sourceElement.innerHTML = targetElement.innerHTML;
        targetElement.innerHTML = temp;
    }

    if (swapHistory.length === 0) {
        undoButton.disabled = true;
    }
}); 

