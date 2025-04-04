function myFunction() {
    const nav = document.getElementById("myTopnav");
    if (nav.className === "topnav") {
        nav.className += " responsive";
    } else {
        nav.className = "topnav";
    }


    const toggleMobileSubMenu = document.querySelectorAll('.dropdown');
    toggleMobileSubMenu.forEach(dropdown => {
        dropdown.addEventListener('click', function () {
            const subMenu = this.querySelector('.subMenu');
            if (window.innerWidth <= 600) {
                subMenu.style.display =
                    subMenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
}