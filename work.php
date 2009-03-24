<?php include "partials/header.php"; ?>
    <script type="text/javascript">
    try {
    	if(navigation) {
    		void(0);
    	}
    }
    catch(e) {
    	window.location.assign("index.php#work");
    }
    </script>

  </head>
  <body class="home">
    <div id="wrapper">
      <div id="content">
        <div id="header">
          <h1><a href="#">Hyperbole Design</a></h1>
          <?php include "partials/navigation.php"; ?>
        </div>
      
        <h2 id="content_header">Work</h2>
        <div id="contentText">
          <p>Work text goes here</p>
        </div>
      </div>
      <?php include "partials/work.php"; ?>
      <?php include "partials/footer.php"; ?>