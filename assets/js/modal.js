document.addEventListener('DOMContentLoaded', function () {
    const infoIcon = document.querySelector('.info-icon');
    let modalContainer = document.getElementById('modalContainer');
    const closeModal = document.getElementById('closeModal');
    const containers = document.querySelectorAll('.container');
    const attributions = document.querySelectorAll('.attribution');
    const floatingInfoIcon = document.querySelectorAll('.floating-info-icon');
    const modalTitle = document.querySelector('.modal-title');

    var state = {
        isDragging: false,
        modalOpened: false,
        xDiff: 0,
        yDiff: 0,
        x: 0,
        y: 0        
    };

    const draggableRegion = document.querySelector('.modal-wrapper');

    function renderModal(myState) {
        modalContainer.style.transform = 'translate(' + myState.x + 'px, ' + myState.y + 'px)';
    }

    function clampX(n) {
        return Math.min(Math.max(n, 0), draggableRegion.offsetWidth - modalContainer.offsetWidth);
    }

    function clampY(n) {
        return Math.min(Math.max(n, 0), draggableRegion.offsetHeight - modalContainer.offsetHeight);
    }

    function openModal() {
        if (!state.modalOpened) {
            state.modalOpened = true;
        }

        modalContainer.style.display = 'block';

        containers.forEach(container => container.classList.add('blur'));
        attributions.forEach(attribution => attribution.classList.add('blur'));
        floatingInfoIcon.forEach(floatingInfoIcon => floatingInfoIcon.classList.add('blur'));

        containers.forEach(container => container.style.pointerEvents = 'none');
        attributions.forEach(attribution => attribution.style.pointerEvents = 'none');
        floatingInfoIcon.forEach(floatingInfoIcon => floatingInfoIcon.style.pointerEvents = 'none');
    }

    function closeModalFunc() {
        modalContainer.style.display = 'none';

        containers.forEach(container => container.classList.remove('blur'));
        attributions.forEach(attribution => attribution.classList.remove('blur'));
        floatingInfoIcon.forEach(floatingInfoIcon => floatingInfoIcon.classList.remove('blur'))

        containers.forEach(container => container.style.pointerEvents = 'auto');
        attributions.forEach(attribution => attribution.style.pointerEvents = 'auto');
        floatingInfoIcon.forEach(floatingInfoIcon => floatingInfoIcon.style.pointerEvents = 'auto');
    }

    window.centerModal = function () {
        // Make modal temporarily visible
        modalContainer.style.visibility = 'hidden';
        modalContainer.style.display = 'block';
    
        // Get modal dimensions
        const modalWidth = modalContainer.offsetWidth;
        const modalHeight = modalContainer.offsetHeight;
    
        // Hide modal again
        modalContainer.style.display = 'none';
        modalContainer.style.visibility = 'visible';
    
        const topValue = Math.max((window.innerHeight - modalHeight) / 2, 0);
        const leftValue = Math.max((window.innerWidth - modalWidth) / 2, 0);
    
        const transformValue = `translate(${leftValue}px, ${topValue}px)`;
        modalContainer.style.transform = transformValue;
        firstTransform = transformValue;
    };    

    function onMouseMove(e) {
        if (state.isDragging) {
            modalTitle.style.cursor = 'grabbing', 'move';
            state.x = clampX(e.clientX - draggableRegion.getBoundingClientRect().left - state.xDiff);
            state.y = clampY(e.clientY - draggableRegion.getBoundingClientRect().top - state.yDiff);
            renderModal(state);
        }
    }

    function onMouseDown(e) {
        const boundingRect = draggableRegion.getBoundingClientRect();  

        if (!state.isDragging) {
            const currentTransform = window.getComputedStyle(modalContainer).transform;
            const match = currentTransform.match(/matrix\(([^,]+), ([^,]+), ([^,]+), ([^,]+), ([^,]+), ([^,]+)\)/);
    
            if (match) {
                state.x = parseFloat(match[5]);
                state.y = parseFloat(match[6]);
            }
        }
    
        state.isDragging = true;
        state.xDiff = e.clientX - boundingRect.left - state.x;
        state.yDiff = e.clientY - boundingRect.top - state.y;
    }

    function onTouchStart(e) {
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            const boundingRect = draggableRegion.getBoundingClientRect();
    
            if (!state.isDragging) {
                const currentTransform = window.getComputedStyle(modalContainer).transform;
                const match = currentTransform.match(/matrix\(([^,]+), ([^,]+), ([^,]+), ([^,]+), ([^,]+), ([^,]+)\)/);
    
                if (match) {
                    state.x = parseFloat(match[5]);
                    state.y = parseFloat(match[6]);
                }
            }
    
            state.isDragging = true;
            state.xDiff = touch.clientX - boundingRect.left - state.x;
            state.yDiff = touch.clientY - boundingRect.top - state.y;
        }
    }

    function onTouchMove(e) {
        if (state.isDragging && e.touches.length === 1) {
            const touch = e.touches[0];
            const boundingRect = draggableRegion.getBoundingClientRect();
            modalTitle.style.cursor = 'grabbing', 'move';
            state.x = clampX(touch.clientX - boundingRect.left - state.xDiff);
            state.y = clampY(touch.clientY - boundingRect.top - state.yDiff);
            renderModal(state);
        }
    }    

    function onMouseUp() {
        modalTitle.style.cursor = 'grab', 'move';
        state.isDragging = false;
    }

    function onTouchEnd() {
        modalTitle.style.cursor = 'grab', 'move';
        state.isDragging = false;
    }

    infoIcon.addEventListener('click', openModal);
    closeModal.addEventListener('click', closeModalFunc);

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeModalFunc();
        }
    });

    modalTitle.addEventListener('mouseenter', function() {
        modalTitle.style.cursor = 'grab', 'move';
    });

    modalTitle.addEventListener('mouseleave', function() {
        modalTitle.style.cursor = 'default';
    });

    modalTitle.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    modalTitle.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
});

window.onload = function () {
    window.centerModal();
};
