<!DOCTYPE html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Sprogapplikation udviklet til CDI.">
    <meta name="author" content="Team Vandmand, 2018-19.">
    <title>Upload lyd</title>
    
    <!-- jQuery -->
    <script
      src="https://code.jquery.com/jquery-3.3.1.min.js"
      integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
      crossorigin="anonymous">
    </script>

    <!-- Bootstrap core CSS -->
    <link rel ='stylesheet' href='bootstrap.min.css'>
    <!-- <link rel='stylesheet' href='/stylesheets/style.css' /> -->
    <link rel="stylesheet" href='style2.css'>
    <!-- FontAwesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
  </head> 
  <body>
    <!-- Navigation med bootstrap -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
      <div class="container">
        <!-- Font Awesome med icon, så nå du trykker på den, kommer du til startsiden -->
        <a href='http://www.exino.dk/profile'><i class="fas fa-home" id="home"></i></a>
        <a class="navbar-brand" href='http://www.exino.dk/profile'>Sprog App</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="http://www.exino.dk/profile">Dashboard
                <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="http://www.exino.dk/billedbog">Billede</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="http://www.exino.dk/videobog">Video</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="http://www.exino.dk/underUdvikling.html">Chat</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="http://www.exino.dk/connectId">Tilknyt</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="http://www.exino.dk/support">Support</a>
            </li>
             <li class="nav-item">
              <a class="nav-link" href="http://www.exino.dk/profile/logout">Log ud</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Page Content -->
    <?php
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
    $uploadOk = 1;
	$target_file_noSpaces = str_replace(' ', '', $target_file);
    $imageFileType = strtolower(pathinfo($target_file_noSpaces,PATHINFO_EXTENSION));
    move_uploaded_file($_FILES[fileToUpload][tmp_name],$target_file_noSpaces);
    ?>

    <center>
        <h1 class="loggedInHeading">Upload lyd</h1>
        <p class="loggedInText">Her kan du optage eller tilføje lyd, som du kan tilføje til dine billeder i din billedordbog.</p>
    </center>
    <br>
    <div id="tilføjLyd">
        <p>Tilføj lyd til systemet</p>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-6 m-auto">
                <form action="index.php" method="POST" enctype="multipart/form-data">
                    <div class="custom-file mb-3">
                        <input type="file" accept="audio/*" id="fileToUpload" capture="audio" name="fileToUpload" class="custom-file-input" required>
                        <label for="fileToUpload" class="custom-file-label"><i class="fas fa-microphone"></i>
							<label id="file-name">Vælg lydfil</label>
						</label>
                    </div>
                    <input type="submit" value="Tilføj valgte lyd" class="btn btn-success btn-block" name="submit">
                </form>
            </div>
        </div>
    </div>
    <br>
    <center>
      <h3 class="loggedInHeading">Link til lyd</h1>
      <p class="loggedInText">
        <?php
        if($target_file == "uploads/") {
          echo '<p>Upload lydfil for at oprette link!</p>';
        } else {
          echo '<input type="text" id="link" class="form-control" value="http://n4.dk/uploadLyd/';
          echo $target_file_noSpaces;
          echo '"><br>';
          echo '<button class="btn btn-lg btn-primary btn-block" onclick="copyLink()">Kopier link</button><br>';
		  echo '<a href="http://www.exino.dk/billedbog" style="text-decoration:none;" target="_self"><button class="btn btn-lg btn-primary btn-block">Gå til billedordbog</button></a>';
        }
        ?>
      </p>
    </center>

    <script>
      function copyLink() {
        /* Get the text field */
        var copyThatShit = document.getElementById("link");

        /* Select the text field */
        copyThatShit.select();

        /* Copy the text inside the text field */
        document.execCommand("copy");

        /* Alert the copied text */
        alert("Indsæt nu linket til et billede i din billedordbog.");
      }
	  
	// Funktion til at vise navnet på filen når den bliver valgt.
		$("#fileToUpload").change(function () {
			$("#file-name").text(this.files[0].name);
		});
    </script>
    
    <!-- Bootstrap core JavaScript -->
    <script src='jquery.min.js'></script>
    <script src='bootstrap.bundle.min.js'></script>
 </body>
</html>