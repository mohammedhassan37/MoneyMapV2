    const dashboardLink = document.getElementById('dashboardLink');
    const transactionsLink = document.getElementById('transactionsLink');
    const dashboardSection = document.getElementById('dashboardSection');
    const transactionsSection = document.getElementById('transactionsSection');
   
        // Show dashboard by default
        dashboardSection.style.display = 'block';
        transactionsSection.style.display = 'none';
  


       function dashboardLinks(){
         dashboardLink.addEventListener('click', () => {
            dashboardSection.style.display = 'block';
            transactionsSection.style.display = 'none';
             
        });
       }

       function transactionsLinks(){
         transactionsLink.addEventListener('click', () => {
            dashboardSection.style.display = 'none';
            
            transactionsSection.style.display = 'block';
        });
    }



  

    dashboardLinks();
    transactionsLinks();



