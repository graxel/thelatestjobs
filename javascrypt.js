fetch('example-data.csv')
    .then(res => res.blob()) // Gets the response and returns it as a blob
    .then(blob => {
        csvFileToJSON(blob);
    });

//Method to read csv file and convert it into JSON 
function csvFileToJSON(file){
    try {
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = function(e) {
            var jsonData = [];
            var headers = [];
            var rows = e.target.result.split("\r\n");               
            for (var i = 0; i < rows.length; i++) {
                var cells = rows[i].split(",");
                var rowData = {};
                for(var j=0;j<cells.length;j++){
                    if(i==0){
                        var headerName = cells[j].trim();
                        headers.push(headerName);
                    }else{
                        var key = headers[j];
                        if(key){
                            rowData[key] = cells[j].trim();
                        }
                    }
                }
                if(i!=0){
                    jsonData.push(rowData);
                }
            }
            //displaying the json result into HTML table
            displayJsonToHtmlTable(jsonData);
        }
    }catch(e){
        console.error(e);
    }
}

//Method to display the data in HTML Table
function displayJsonToHtmlTable(jsonData){
    var table=document.getElementById("display_csv_data");
    if(jsonData.length>0){
        var headers = Object.keys(jsonData[0]);
        var htmlHeader='<thead><tr>';
        for(var i=0;i<headers.length;i++){
            htmlHeader+= '<th>'+headers[i]+'</th>';
        }
        htmlHeader+= '<tr></thead>';
         
        var htmlBody = '<tbody>';
        for(var i=0;i<jsonData.length;i++){
            var row=jsonData[i];
            htmlBody+='<tr>';
            for(var j=0;j<headers.length;j++){
                var key = headers[j];
                htmlBody+='<td>'+row[key]+'</td>';
            }
            htmlBody+='</tr>';
        }
        htmlBody+='</tbody>';
        table.innerHTML=htmlHeader+htmlBody;
    }else{
        table.innerHTML='There is no data in CSV';
    }
}
