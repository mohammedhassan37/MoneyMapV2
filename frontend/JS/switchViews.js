    const dashboardLink = document.getElementById('dashboardLink');
    const transactionsLink = document.getElementById('transactionsLink');
    const dashboardSection = document.getElementById('dashboardSection');
    const transactionsSection = document.getElementById('transactionsSection');
    const amountLink = document.getElementById('amountLink');
    const amountSection = document.getElementById('amountSection');

        // Show dashboard by default
        dashboardSection.style.display = 'block';
        transactionsSection.style.display = 'none';
        amountSection.style.display = 'none'


       function dashboardLinks(){
         dashboardLink.addEventListener('click', () => {
            dashboardSection.style.display = 'block';
            transactionsSection.style.display = 'none';
             amountSection.style.display = 'none';
        });
       }

       function transactionsLinks(){
         transactionsLink.addEventListener('click', () => {
            dashboardSection.style.display = 'none';
            amountSection.style.display = 'none';
            transactionsSection.style.display = 'block';
        });
    }



     function amountLinks(){
       amountLink.addEventListener('click', () =>{
        dashboardSection.style.display = 'none';
        transactionsSection.style.display = 'none';
        amountSection.style.display = 'block';
       } ) 
    }

    dashboardLinks();
    transactionsLinks();
    amountLinks();


