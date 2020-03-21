// All Countries
        fetch( "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=1%3D1&returnGeometry=false&outFields=*&orderByFields=Country_Region%20asc%2CProvince_State%20asc&resultOffset=0&resultRecordCount=1000&cacheHint=true" )
        .then( r => r.json() )
        .then( r => {
            if( r ) {
                let data = r.features.map( x => x.attributes ).map( x => ({
                    date: x.Last_Update,
                    formattedDate: moment( x.Last_Update + 18000000 ).format( "lll" ),
                    country: x.Country_Region || "",
                    cases: x.Confirmed || 0,
                    deaths: x.Deaths || 0,
                    recovered: x.Recovered || 0,
                    active: x.Active || 0,
                }));
                console.log( data );
                // data.pop();
                let maxCases = Math.max( ...data.map( x => x.cases ) );
                
                grouped = [];

data.forEach(function (a) {
    var key = ['country'].map(function (k) { return a[k]; }).join('|');
    if (!this[key]) {
        this[key] = { country: a.country, cases: 0, deaths: 0, recovered: 0, active: 0, formattedDate: a.formattedDate};
        grouped.push(this[key]);
    }
    if(a.formattedDate > this[key].formattedDate) this[key].formattedDate = a.formattedDate;
    this[key].cases += a.cases;
    this[key].deaths += a.deaths;
    this[key].recovered += a.recovered;
    this[key].active += a.active;
}, Object.create(null));
                
                let totalCases = 0;
                let totalDeaths = 0;
                let totalRecovered = 0;
                
                grouped.forEach( (x,i) => {
                    $( "#breakdown tr:last" ).after( `
                      <tr>
                        <td>${x.country}</td>
                        <td class="table-${getLessIsBetterHighlight( x.cases / maxCases )}">${x.cases}</td>
                        <td class="table-${getLessIsBetterHighlight( x.deaths / x.cases )}">${x.deaths} <small>(${ ( x.deaths / x.cases * 100 ).toFixed( 2 ) }%)</small></td>
                        <td class="table-${getMoreIsBetterHighlight( x.recovered / x.cases )}">${x.recovered} <small>(${ ( x.recovered / x.cases * 100 ).toFixed( 2 ) }%)</small></td>
                        <td class="table-${getLessIsBetterHighlight( x.active / x.cases )}">${x.active} <small>(${ ( x.active / x.cases * 100 ).toFixed( 2 ) }%)</small></td>
                        <td><small>${x.formattedDate}</small></td>
                      </tr>` );
                      
                      totalCases += x.cases;
                      totalDeaths += x.deaths;
                      totalRecovered += x.recovered;
                });
                
                $( "#totalcasesdatatable tr:last" ).after( `
                      <tr>
                        <td>${totalCases}</td>
                        <td>${totalDeaths}</td>
                        <td>${totalRecovered}</td>
                      </tr>` );
                
				
				sortTable(1,"breakdown");
            }
        });
        
        
        

        // China in Detail
        fetch( "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=1%3D1&returnGeometry=false&outFields=*&orderByFields=Country_Region%20asc%2CProvince_State%20asc&resultOffset=0&resultRecordCount=1000&cacheHint=true" )
        .then( r => r.json() )
        .then( r => {
            if( r ) {
                let data = r.features.map( x => x.attributes ).filter( x => x.Country_Region === "Mainland China" || x.Country_Region === "China" ).map( x => ({
                    date: x.Last_Update,
                    formattedDate: moment( x.Last_Update + 18000000 ).format( "lll" ),
                    province: x.Province_State || "",
                    country: x.Country_Region || "",
                    cases: x.Confirmed || 0,
                    deaths: x.Deaths || 0,
                    recovered: x.Recovered || 0,
                }));
                console.log( data );
                
                // Max after Hubei (Wuhan)
                let maxCases = Math.max( ...data.filter( x => x.province !== "Hubei" ).map( x => x.cases ) );
                console.log( maxCases );
                data.forEach( (x,i) => {
                    $( "#breakdown-china tr:last" ).after( `
                      <tr>
                        <td class="table-${x.province === "Hubei" ? "secondary" : "default"}">${x.province}</td>
                        <td class="table-${getLessIsBetterHighlight( x.cases / maxCases )}">${x.cases}</td>
                        <td class="table-${getLessIsBetterHighlight( x.deaths / x.cases )}">${x.deaths} <small>(${ ( x.deaths / x.cases * 100 ).toFixed( 2 ) }%)</small></td>
                        <td class="table-${getMoreIsBetterHighlight( x.recovered / x.cases )}">${x.recovered} <small>(${ ( x.recovered / x.cases * 100 ).toFixed( 2 ) }%)</small></td>
                        <td><small>${x.formattedDate}</small></td>
                      </tr>` );
                });
                
               sortTable(1,"breakdown-china");
            }
        });
		
        
        
        
        
        
		// USA in Detail
        fetch( "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=1%3D1&returnGeometry=false&outFields=*&orderByFields=Country_Region%20asc%2CProvince_State%20asc&resultOffset=0&resultRecordCount=1000&cacheHint=true" )
        .then( r => r.json() )
        .then( r => {
            if( r ) {
                let data = r.features.map( x => x.attributes ).filter( x => x.Country_Region === "US" || x.Country_Region === "USA" ).map( x => ({
                    date: x.Last_Update,
                    formattedDate: moment( x.Last_Update + 18000000 ).format( "lll" ),
                    state: x.Province_State || "",
                    country: x.Country_Region || "",
                    cases: x.Confirmed || 0,
                    deaths: x.Deaths || 0,
                    recovered: x.Recovered || 0,
                }));
                console.log( data );

                // Max after New York
                let maxCases = Math.max( ...data.filter( x => x.state !== "New York" ).map( x => x.cases ) );
                console.log( maxCases );
                data.forEach( (x,i) => {
                    $( "#breakdown-usa tr:last" ).after( `
                      <tr>
                        <td class="table-${x.state === "New York" ? "secondary" : "default"}">${x.state}</td>
                        <td class="table-${getLessIsBetterHighlight( x.cases / maxCases )}">${x.cases}</td>
                        <td class="table-${getLessIsBetterHighlight( x.deaths / x.cases )}">${x.deaths} <small>(${ ( x.deaths / x.cases * 100 ).toFixed( 2 ) }%)</small></td>
                        <td class="table-${getMoreIsBetterHighlight( x.recovered / x.cases )}">${x.recovered} <small>(${ ( x.recovered / x.cases * 100 ).toFixed( 2 ) }%)</small></td>
                        <td><small>${x.formattedDate}</small></td>
                      </tr>` );
                });
                sortTable(1, "breakdown-usa");
            }
        });
        
        
        
                // China vs Others
        fetch( `https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/cases_time_v3/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Report_Date_String%20asc&resultOffset=0&resultRecordCount=3000&cacheHint=true` )
        .then( r => r.json() )
        .then( r => {
            if( r ) {
                let data = r.features.map( x => x.attributes ).map( x => ({
                    date: x.Report_Date,
                    formattedDate: moment( x.Report_Date ).format( "ll" ),
                    china: x.Mainland_China,
                    other: x.Other_Locations,
                    total: x.Total_Confirmed
                }));
                console.log( data );
                $( "#updated" ).text( `(Updated ${data[ data.length - 1 ].formattedDate})` );

                data.forEach( (x,i) => {
                    let prevChina = ( i > 0 ? data[ i - 1 ].china : x.china );
                    let prevOther = ( i > 0 ? data[ i - 1 ].other : x.other );
                    let prevTotal = ( i > 0 ? data[ i - 1 ].total : x.total );
                    if( x.total ) {
                        $( "#quickview tr:last" ).after( `
                          <tr>
                            <th scope="row">${x.formattedDate}</th>
                            <td class="table-${getLessIsBetterHighlight( ( x.china - prevChina ) / prevChina )}">${x.china} <small>(+${ ( ( x.china - prevChina ) / prevChina * 100 ).toFixed( 2 ) }%)</small></td>
                            <td class="table-${getLessIsBetterHighlight( ( x.other - prevOther ) / prevOther )}">${x.other} <small>(+${ ( ( x.other - prevOther ) / prevOther * 100 ).toFixed( 2 ) }%)</small></td>
                            <td class="table-${getLessIsBetterHighlight( ( x.total - prevTotal ) / prevTotal )}">${x.total} <small>(+${ ( ( x.total - prevTotal ) / prevTotal * 100 ).toFixed( 2 ) }%)</small></td>
                            <td>${x.total - prevTotal}</small></td>
                          </tr>` );
                    }
                });
            }
        });
        
        
        // LessIsBetterHighlight & MoreIsBetterHighlight Logic

        function getLessIsBetterHighlight( x ) {
            if( x <= 0 ) {
                return "secondary";
            }
            else if( x < 0.25 ) {
                return "info";
            }
            else if( x < 0.5 ) {
                return "warning";
            }
            else {
                return "danger";
            }
        }

        function getMoreIsBetterHighlight( x ) {
            if( x <= 0 ) {
                return "danger";
            }
            else if( x < 0.25 ) {
                return "warning";
            }
            else if( x < 0.5 ) {
                return "info";
            }
            else {
                return "success";
            }
        }
        
        
        
		
		// Sort First Table by Cases
		function sortTable(num, tableName) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById(tableName);
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[num];
      y = rows[i + 1].getElementsByTagName("TD")[num];
      //check if the two rows should switch place:
      if (Number(x.innerHTML) < Number(y.innerHTML)) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}