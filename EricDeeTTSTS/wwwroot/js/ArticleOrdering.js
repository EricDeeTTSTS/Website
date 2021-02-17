/* 2-5-2021
Author: Eric Dee
http://EricDeeTTSTS.com/ */

function MakeArticlesActive(Index) {

    var aComputerlanguage = "../TextForArticleConversion/Acomputerlanguage.txt";
    var buildingAnOperatingSystem = "../TextForArticleConversion/Buildinganoperatingsystem.txt";
    var creatingASoftwareSynthesizer = "../TextForArticleConversion/Creatingasoftwaresynthesizer.txt";
    var allArticles = "../TextForArticleConversion/Allarticles.txt";

    document.getElementById('ArticlesButton_Acomputerlanguage').classList.remove("Active");
    document.getElementById('ArticlesButton_Buildinganoperatingsystem').classList.remove("Active");
    document.getElementById('ArticlesButton_Creatingasoftwaresynthesizer').classList.remove("Active");
    document.getElementById('ArticlesButton_Everything').classList.remove("Active");
    document.getElementById('ArticlesButton_Minimize').classList.remove("Active");

    if (Index === 1) {
        document.getElementById('ArticlesButton_Acomputerlanguage').classList.add("Active");

        DisplayAllArticles(aComputerlanguage);

    }

    if (Index === 2) {
        document.getElementById('ArticlesButton_Buildinganoperatingsystem').classList.add("Active");

        DisplayAllArticles(buildingAnOperatingSystem);

    }

    if (Index === 3) {
        document.getElementById('ArticlesButton_Creatingasoftwaresynthesizer').classList.add("Active");

        DisplayAllArticles(creatingASoftwareSynthesizer);
    }

    if (Index === 4) {
        document.getElementById('ArticlesButton_Everything').classList.add("Active");

        DisplayAllArticles(allArticles);
    }

    if (Index === 5) {
        document.getElementById('ArticlesButton_Minimize').classList.add("Active");

        DisplayZeroArticles();
    }
}

function DisplayAllArticles(fileLocation) {

    jQuery.get(fileLocation, function (textString) {
        document.getElementById("Articles").innerHTML = textString;
    });
}

function DisplayZeroArticles() {

        document.getElementById("Articles").innerHTML = "<p></p>";
}

function DisplayOneArticle(index) {

    /* Gets the text file full of articles */

    jQuery.get("../TextForArticleConversion/Articles.txt", function (textString) {

        var atCount = 0;
        var atIndex = 0;
        var cIndex = 0;
        var exit = false;

        /* The file is marked such that every @ character begins and ends the article (like a bootstrap) */

        while (!exit) {
            if (textString.charAt(cIndex) === "@") {
                atCount++;
                if (atCount % 2 != 0) {
                    atIndex++;
                }
                if (atIndex === index) {
                    break;
                }
            }
            cIndex++;
        }

        cIndex++;

        if (textString.charAt(cIndex) === "@") {
            return;
        }

        stackString = textString.charAt(cIndex);

        while (!exit) {
            cIndex++;
            if (textString.charAt(cIndex) === "@") {
                atCount++;
                break;
            }
            stackString += textString.charAt(cIndex);
        }

        document.getElementById("Articles").innerHTML = stackString;

        /* File parsing has completed. Note that using the result as a return seems to regularly cause lost information. Unsure of the cause at this time, but it seems to be a browser coding incompatibility.
         * As the same information gets lost when an attempt to update a global variable is made. */
    });
}