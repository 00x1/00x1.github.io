const adjustFooter = () => {
    const screenWidth = window.innerWidth;
    const bgLink = document.querySelector('.bg-link');

    // Remove existing anchors if present
    while (bgLink.firstChild) {
        bgLink.removeChild(bgLink.firstChild);
    }

    if (screenWidth <= 856 || screenWidth >= 857) {
        // Create two new anchor elements with the required text
        const firstAnchor = document.createElement('a');
        firstAnchor.href = 'https://www.flickr.com/people/80901381@N04';
        firstAnchor.target = '_blank';
        firstAnchor.rel = 'noopener noreferrer';
        firstAnchor.title = 'CC BY 2.0 Deed - Attribution 2.0';
        firstAnchor.innerText = (screenWidth <= 856) ? 'A Guy Taking Pictures' : 'A Guy Taking Pictures';

        const secondAnchor = document.createElement('a');
        secondAnchor.href = 'https://www.flickr.com/people/80901381@N04';
        secondAnchor.target = '_blank';
        secondAnchor.rel = 'noopener noreferrer';
        secondAnchor.title = 'CC BY 2.0 Deed - Attribution 2.0';
        secondAnchor.innerText = '(Samuel S)';

        // Insert line break before the (Samuel S) text using innerHTML
        if (screenWidth <= 856) {
            secondAnchor.innerHTML = '<br>' + secondAnchor.innerText;
        } else {
            secondAnchor.innerHTML = secondAnchor.innerText;
        }

        // Append the new elements to the existing container
        bgLink.appendChild(firstAnchor);
        bgLink.appendChild(secondAnchor);
    }
};

// Call the adjustFooter function initially and add an event listener for window resize
adjustFooter();
window.addEventListener('resize', adjustFooter);
