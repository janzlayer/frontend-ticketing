var mobileMenuContainer = document.getElementById('mobile-menu-container');

function showMobileMenu(){
    if (!mobileMenuContainer.classList.contains('open')){
        mobileMenuContainer.style.display = 'flex';
        mobileMenuContainer.classList.add('open');
    } else {
        mobileMenuContainer.style.display = 'none';
        mobileMenuContainer.classList.remove('open');
    }
}

