// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".devourBurger").on("click", function(event) {
        var id = $(this).data("id");
        var burgerDevoured = $(this).data("burgerDevoured")
       
        var burgerStatus = {
            devour: devoured
        }
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: burgerStatus
      }).then(
        function() {
          console.log("Eaten", devoured);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });

    $(".create-form").on("submit", function(event) {
        event.preventDefault()

        var newBurger = {
          name: $("#burgerAdd").val().trim(),
        };
    
        // Send the POST request.
        $.ajax("/api/burgers", {
          type: "POST",
          data: newBurger
        }).then(
          function() {
            console.log("created new burger");
            location.reload();
          }
        );
      });

      $(".deleteBurger").on("click", function(event) {
        var id = $(this).data("id");

        $.ajax("/api/burgers/" + id, {
          type: "DELETE"
        }).then(
          function() {
            console.log("deleted id ", id);
            location.reload();
          }
        );
      });
  });