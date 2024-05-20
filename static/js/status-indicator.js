document.querySelectorAll('.status-indicator').forEach(function(statusIndicator){
    (statusIndicator.innerText == 'Completed') ?  statusIndicator.classList.add('approved') : 
    (statusIndicator.innerText == 'Approved') ?  statusIndicator.classList.add('approved') : 
    (statusIndicator.innerText == 'Denied') ?  statusIndicator.classList.add('rejected') : 
    (statusIndicator.innerText == 'Processing') ?  statusIndicator.classList.add('pending') :
    statusIndicator.classList.add('pending')
});

