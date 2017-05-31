// Main JS File for Cat Lady Scale

$(document).ready(function(){

    /*
     * Behavior Class
     * constructor - needs the description and pointValue to construct
     * listItem function - returns the behavior as an html string
     */
    function Behavior (description, pointValue) {
        this.description = description;
        this.pointValue = pointValue;
    }
    Behavior.prototype = {
        getListItem: function () {
            return '<div class="behavior-item">' +
                '<div class="description">' + this.description + '</div>' +
                '<div class="points">' + this.pointValue + '</div>' +
                '</div>';
        },
    };

    /*
     * Status Class
     * constructor - needs the title for the status and a corresponding image
     * imagePath function - returns local path to the image (for using in the src attr)
     */
    function Status (title, image) {
        this.title = title;
        this.image = image;
    }
    Status.prototype = {
        imagePath: function (){
            return 'images/' + this.image;
        }
    };

    /*
     * Cat Lady Behaviors
     * list of all possible behaviors to fill the drop down form
     */
    var catLadyBehaviors = [
        new Behavior("agrees that there's a cat gif for everything", 3),
        new Behavior("own one dog", -2),
        new Behavior("own one cat", 2),
        new Behavior("own more than one cat", 5),
        new Behavior("own more than one dog", -5),
        new Behavior("takes selfies with cats", 4),
        new Behavior("volunteers at Tenth Life", 7),
        new Behavior("watches the Kitten Academy YouTube channel", 5),
        new Behavior("thinks cat eyes are scary", -6),
    ];

    /*
     * Cat Lady Scale
     * description: the cat lady scale is indexed by the number on the scale. Each
     * scale number has an object with a title and image name associated with it.
     */
    var CAT_LADY_SCALE = {
        10: new Status("Cat-sylum", 'cat_lady.jpg' ),
        9: new Status("ALL OF THE CATS", 'all_kittens.jpg' ),
        8: new Status("Takin Selfies With Cats", 'cat_selfie.jpg' ),
        7: new Status("A One-Cat Kind of Human", 'one_cat.jpg' ),
        6: new Status("Cat Gifs Are...Alright", 'grumpy.jpg' ),
        5: new Status("Indifferent", 'cat_dog_friends.jpg' ),
        4: new Status("Ehh, Dogs Greater...", 'cat_backseat.jpg' ),
        3: new Status("Dogs are where it's at", 'dogs.jpg' ),
        2: new Status("I wish I were allergic", 'allergic.jpg' ),
        1: new Status("Cats...like, the musical?", 'cats.jpg' ),
        0: new Status("What's a cat? Never heard of 'em", 'dog_heaven.jpg' ),
    };

    /*
     * Cat Lady Object
     * behaviors - array of behavior objects
     * addBehavior - function that adds behavior and updates cat lady object as necessary
     * status - the current cat lady status object
     * updateStatus - function that updates the cat lady objects status
     */
    var catLady = {
        behaviors: [],
        addBehavior : function (newBehavior) {
            this.behaviors.push(newBehavior);
            this.updateStatus();
        },
        status: CAT_LADY_SCALE[5], // just the inital status... INDIFFERENT
        updateStatus: function () {

            var points = 5;

            for(var i = 0; i < catLady.behaviors.length; i++){
                points += catLady.behaviors[i]['pointValue'];
            }

            if(points < 0){
                points = 0;
            }

            if(points > 10){
                points = 10;
            }

            catLady.status = CAT_LADY_SCALE[points];
        },
    };

    /*
     * Add Behavior Click Event
     * handles when the user adds a behavior
     */

        $('#add-behavior').click(function(e){
            if(event.keyCode == 13){
            $("#add-behavior").trigger('click');
            return false;
            }
            event.preventDefault();

        var index = $('#behavior-select').val();

        catLady.addBehavior(catLadyBehaviors[index]);

        displayNewBehavior(catLadyBehaviors[index]);

        displayStatus(catLady.status);
    });

    /*
     * Display New Behavior
     * add the passed in behavior to the display in the behavior list in the html
     */
    function displayNewBehavior (behavior)
    {
        $('.behavior-list').append(behavior.getListItem());
    }

    /*
     * Update Status Display
     * updates the cat lady status display in the html with the cat status object it was passed
     */
    function displayStatus (catLadyStatus)
    {
        $('.status-image img').attr('src', 'images/'+catLadyStatus.image);

        $('.status-title').text(catLadyStatus.title);
    }

    /*
     * Fill Behavior Drop Down
     * adds all behaviors from the catLadyBehaviors array as options in the html dropdown
     */
    function fillBehaviorDropDown ()
    {
        for (var i = 0; i < catLadyBehaviors.length; i++) {
            var description = catLadyBehaviors[i].description;
            var points = catLadyBehaviors[i].pointValue;
            var option = '<option value="' + i +'">' + description + '</option>';
            $('#new-behavior-form .behaviors').append(option);
        }
    }

    /*
     * Updates the selected options in the add behavior drop down
     * the current selected option, will have a select attribute associated with it.
     */
    $('body').on('change', 'select', function(){
        $('option[selected]').removeAttr('selected');
        $("option[value=" + this.value + "]").attr('selected', true);
    });

    // initial setup
    fillBehaviorDropDown(); // fill drop down
    displayStatus(catLady.status); // display initial cat lady status
});
