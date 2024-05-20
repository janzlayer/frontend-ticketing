function closeModal() {
    // Close all modals
    document.querySelectorAll('.modal').forEach(function(modals){
        modals.style.display = 'none';
    });
}

document.addEventListener('click', function(event) {
    document.querySelectorAll('.modal').forEach(function(modals){
        (event.target == modals) ? closeModal() : null;
        
    }); 
});

// COMMENT OUT FOR THE MEANTIME
// document.addEventListener('keydown', function(event){
//     (event.keyCode === 27) ? closeModal() : console.log('pass') ;
// });