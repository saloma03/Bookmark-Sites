var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var sites;
if(localStorage.getItem("sites") == null){
    sites = [];
}else{
    sites = JSON.parse(localStorage.getItem("sites")) ;
    displaySites();
}

function addSite(){
    if(validateInput(siteName)&&validateInput(siteURL)){
        var site = {
            sName: siteName.value,
            sUrl: siteURL.value,
        }
        
        sites.push(site);
        localStorage.setItem("sites",JSON.stringify(sites));
        displaySites();
        resetForm();
        siteName.classList.remove('is-valid')
        siteURL.classList.remove('is-valid')

    }

}
function resetForm(){
    siteName.value = "";
    siteURL.value = "";
}

function displaySites(){
    var cartona = ``;
    for(var i =0;i<sites.length;i++){
        cartona += ` <tr>
                    <td>${i+1}</td>
                    <td>${sites[i].sName}</td>
                    <td>
                        <button onclick="visitSite('${sites[i].sUrl}')" type="button" class="btn btn-success ">
                            <i class="fa-solid fa-eye"></i>
                            visit
                        </button></td>
                    <td>
                        <button onclick="deleteSite(${i})" type="button" class="btn btn-danger ">
                            <i class="fa-solid fa-trash"></i>
                            delete
                        </button>
                    </td>
                </tr>`
    }
    document.getElementById("sitesContainer").innerHTML = cartona;
}

function visitSite(url){
    if(url.startsWith("https://www.") || url.startsWith("http://www.")){
        window.open(url, '_blank'); 
    }
    else if(url.startsWith("www.")){
        var format1 = "https://" + url;
        window.open(format1, '_blank');

    }
    else{
        var format = "https://www." + url;
        window.open(format, '_blank');
    }
}

function deleteSite(index){
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            sites.splice(index,1);
            localStorage.setItem("sites",JSON.stringify(sites));
            displaySites();
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
      

}

function validateInput(input){
    var regex = {
        siteName: /^[a-zA-Z][a-zA-Z0-9]{3,}$/, 

        siteURL:/^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?(\/)?$/
    }
    if(regex[input.id].test(input.value)){
        input.classList.remove('is-invalid')
        input.classList.add('is-valid')
        return true;
    }else{
        input.classList.remove('is-valid')

        input.classList.add('is-invalid')
        return false;
    }

}