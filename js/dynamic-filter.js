// IIFE used to start script
(function()
  {
    // Data held in object literal notation
    var people =
    [
     {
       name: 'Casey',
       rate: 60
     },
     {
       name: 'Camille',
       rate: 80
     },
     {
       name: 'Gordon',
       rate: 75
     },
     {
       name: 'Nigel',
       rate: 120
     }
   ];
   // Holds the cross-referencing array
   var rows = [];
   // Holds the input to show the minimum rate
   $min = $("#value-min");
   // Holds the input to show the maximum rate
   $max = $("#value-max");
   // Holds the table for the results
   $table = $("#rates");

   /* loops through each person in the
      people array calling an anonymous function for each
      object in the array
  */
  function makeRows()
  {
    // For each person object in people, create a row for them.
    people.forEach(function(person)
    {
      var $row = $("<tr></tr>");
      // Add their name
      $row.append( $("<td></td>").text(person.name));
      // Add their rate
      $row.append( $("<td></td>").text(person.rate));
      // Add object to cross-references between people and rows
      rows.push(
        {
          // Reference to the person object
          person: person,
          // Reference to row as jQuery selection
          $element: $row
        });
    });
  }
  /* creates a new jQuery object called
     $tbody containing a <tbody> element.  */
     // Adds rows to the table
     function appendRows()
     {
       // Create <tbody> element
       var $tbody = $("<tbody></tbody>");
       // For each object in the rows array
       rows.forEach(function(row)
       {
        // Add html for the row
        $tbody.append(row.$element);
       });
       // Add rows to the table
       $table.append($tbody);
     }

     // Update the table content.
     function update(min, max)
     {
       // For each row in the rows array
       rows.forEach(function (row)
       {
         // If in range show the row, otherwise hide the row
         if (row.person.rate >= min && row.person.rate <= max)
         {
           row.$element.show();
         }
         else
         {
           row.$element.hide();
         }
       });

     }
     // Tasks when script first runs
     function init()
     {
       // Sets up slide control
       $("#slider").noUiSlider(
         {
           range: [0, 150], start: [65, 90], handles: 2, margin: 20, connect: true,
           serialization: { to: [$min, $max], resolution: 1 }
         }).change(function() { update($min.val(), $max.val()); });
         // Create table rows and rows array
         makeRows();
         // add the rows to the table
         appendRows();
         // Update table to show matches
         update($min.val(), $max.val());
     }
     // Call init() when DOM is ready
     $(init);
}());
