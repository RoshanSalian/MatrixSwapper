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

            let targetHolder = targetElement.parentNode
            let sourceHolder = draggedElement

            if (sourceHolder.classList.contains("dragging")) {
                sourceHolder.classList.remove("dragging");
            }

            var sourceChild = targetHolder.querySelector('div');
            var targetChild = sourceHolder.querySelector('div');

            targetHolder.replaceChild(targetChild, sourceChild)
            sourceHolder.appendChild(sourceChild)

            var beforeSwap = { 
                sourceElement: sourceChild,
                targetElement: targetChild
            };

            var afterSwap = {
                sourceElement: targetChild,
                targetElement: sourceChild
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

        var sourceElement = document.getElementById(sourceClass.id);
        var targetElement = document.getElementById(targetClass.id);

        let sourceHolder = sourceElement.parentNode
        let targetHolder = targetElement.parentNode

        // swap logic goes here
        targetHolder.replaceChild(sourceElement, targetElement)
        sourceHolder.appendChild(targetElement)
    }

    if (swapHistory.length === 0) {
        undoButton.disabled = true;
    }
}); 

