document.addEventListener('DOMContentLoaded', () => {
    // Trigger entry fade-in
    document.body.classList.add('page-loaded');

    // Handle exit fade-out transition on click
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Filter only internal page transitions
            if (
                href &&
                !href.startsWith('#') &&
                !href.startsWith('javascript:') &&
                !href.startsWith('mailto:') &&
                !href.startsWith('tel:') &&
                link.getAttribute('target') !== '_blank' &&
                !e.metaKey && // Cmd / Win key
                !e.ctrlKey // Ctrl key (open in new tab)
            ) {
                e.preventDefault();
                document.body.classList.remove('page-loaded');
                document.body.classList.add('page-leaving');
                setTimeout(() => {
                    window.location.href = href;
                }, 300); // 300ms matches CSS transition duration
            }
        });
    });
});

// Ensure pages show correctly when navigating back/forward using history cache
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        document.body.classList.remove('page-leaving');
        document.body.classList.add('page-loaded');
    }
});
