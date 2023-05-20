var draggedElement = null;
var dragoverElement = null;
var draggableElements = document.getElementsByClassName('draggable');
var swapHistory = []    // Container to hold the previous states for undo functionality
var undoButton = document.getElementById('undo');
var addButton = document.getElementById('add');
undoButton.disabled = true;     // Undo button is disbaled by default
var table = document.getElementById('container')
var init_val = 4

// Adding event listner for the animation part of swappign
for (var i = 0; i < draggableElements.length; i++) {
    draggableElements[i].addEventListener('dragstart', function(event) {
        draggedElement = event.target;
        draggedElement.classList.add('dragging');
        console.log(draggedElement)
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

            // Saving the before and after state
            var beforeSwap = { 
                sourceElement: sourceChild,
                targetElement: targetChild
            };

            var afterSwap = {
                sourceElement: targetChild,
                targetElement: sourceChild
            };
            swapHistory.push({before: beforeSwap, after: afterSwap});

            // logic to disable the undo button if no swaps done
            if (swapHistory.length > 0) {
                undoButton.disabled = false;
            }
        }
    });
}

// Undo button logic
undoButton.addEventListener('click', function() {
    if (swapHistory.length > 0) {
        var lastSwap = swapHistory.pop();
        var sourceClass = lastSwap.before.sourceElement;
        var targetClass = lastSwap.before.targetElement;

        var sourceElement = document.getElementById(sourceClass.id);
        var targetElement = document.getElementById(targetClass.id);

        let sourceHolder = sourceElement.parentNode
        let targetHolder = targetElement.parentNode

        // swap logic
        targetHolder.replaceChild(sourceElement, targetElement)
        sourceHolder.appendChild(targetElement)
    }

    if (swapHistory.length === 0) {
        undoButton.disabled = true;
    }
}); 


addButton.addEventListener('click', function() {
    console.log("checling added")
    var newRow = table.insertRow(init_val-1)
    var cell1 = newRow.insertCell(0);

    cell1.innerHTML = '<td id="cell-' + init_val+ '-1" draggable=true class="draggable"><div id="' + init_val + 'R1C" class="box random">'+ (3*(init_val-1) + 1)*100 + '</div></td>'
    cell1.id='cell-' + init_val+ '-1'
    cell1.draggable=true
    cell1.className = 'draggable'
    cell1.addEventListener('dragstart', function(event) {
        draggedElement = event.target;
        draggedElement.classList.add('dragging');
        console.log(draggedElement);
    });


    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = '<td id="cell-' + init_val+ '-2" draggable=true class="draggable"><div id="' + init_val + 'R2C" class="box random">'+ (3*(init_val-1) + 2)*100 + '</div></td>'
    cell2.id='cell-' + init_val+ '-1'
    cell2.draggable=true
    cell2.className = 'draggable'
    cell2.addEventListener('dragstart', function(event) {
        draggedElement = event.target;
        draggedElement.classList.add('dragging');
        console.log(draggedElement);
    });

    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = '<td id="cell-' + init_val+ '-3" draggable=true class="draggable"><div id="' + init_val + 'R3C" class="box random">'+ (3*(init_val-1) + 3)*100 + '</div></td>'
    cell3.id='cell-' + init_val+ '-1'
    cell3.draggable=true
    cell3.className = 'draggable'
    cell3.addEventListener('dragstart', function(event) {
        draggedElement = event.target;
        draggedElement.classList.add('dragging');
        console.log(draggedElement);
    });

    init_val+=1


    // Adding swap logic again
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

            // Saving the before and after state
            var beforeSwap = { 
                sourceElement: sourceChild,
                targetElement: targetChild
            };

            var afterSwap = {
                sourceElement: targetChild,
                targetElement: sourceChild
            };
            swapHistory.push({before: beforeSwap, after: afterSwap});

            // logic to disable the undo button if no swaps done
            if (swapHistory.length > 0) {
                undoButton.disabled = false;
            }
        }
    });
}
})



