using EricDeeTTSTS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;

namespace EricDeeTTSTS.Controllers
{
    public class HomeController : Controller
    {
        /// <summary>
        /// This is a "global indexer". It will be updated depending on user instruction at the index.
        /// </summary>
        private string pageView;

        private int pageIndex = 0;

        private readonly List<string> pageViews;

        private readonly ILogger<HomeController> _logger;

        private MediaBotModel MediaBot;

        /// <summary>
        /// Twitter API keys.
        /// </summary>
        private string consumerKey;
        private string consumerKeySecret;
        private string accessToken;
        private string accessTokenSecret;

        public string PageView
        {
            get
            {
                return this.pageView;
            }
        }

        private string setpageview
        {
            set
            {
                this.pageView = value;
            }
        }

        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="logger">A generic interface for logging where the category name is derived from the HomeController type name. Generally used to enable activation of a named ILogger from the dependency injection.</param>
        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
            this.pageViews = new List<string>();
            this.pageViews.Add("Index");
            this.pageViews.Add("Privacy");
            this.pageViews.Add("Projects");
            this.pageViews.Add("~/Views/Reroutes/GoToCommandWall.cshtml");
            this.consumerKey = "";
            this.consumerKeySecret = "";
            this.accessToken = "";
            this.accessTokenSecret = "";
            this.MediaBot = new MediaBotModel(this.consumerKey, this.consumerKeySecret, this.accessToken, this.accessTokenSecret);
        }

        /// <summary>
        /// Begins a find method for page views based on user string token from the parser.
        /// </summary>
        /// <param name="pageView"></param>
        /// <returns>The result of the getPage method for a string from the token.</returns>
        public string NavigatorInput(int pageIndex)
        {
            this.pageIndex = pageIndex;
            this.setpageview = this.getPage(this.pageIndex);
            return this.PageView;
        }

        /// <summary>
        /// Gets a page from list of views based on user string token from the parser.
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <returns>A string from the list of programmer defined web pages.</returns>
        private string getPage(int pageIndex)
        {
            int count = 0;
            foreach (string pageview in this.pageViews)
            {
                if (count == pageIndex)
                {
                    return pageview;
                }
                else
                {
                    count++;
                }
            }
            return null; /// Returns null if page not found. ***Change this to a error view***
        }

        private string ConnectToDataBase()
        {
            return @"";
        }

        private string QueryInstructionToDatabase(string JSString)
        {
            using (var db = new SqlConnection(this.ConnectToDataBase()))
            {
                db.Open();
                var command = new SqlCommand("INSERT INTO StringCommand (Command) VALUES (@Parameter);", db);
                command.Parameters.AddWithValue("@Parameter", JSString);
                command.ExecuteNonQuery();
                command = new SqlCommand("SELECT MAX(Id) FROM StringCommand;", db);
                return Convert.ToString(command.ExecuteScalar());
            }
        }

        public IActionResult Index(int JSInput, string JSString)
        {
            if (JSString != null)
            {
                string tweet = this.QueryInstructionToDatabase(JSString);
                //               tweet += " " + "Command: " + JSString;
                //               this.MediaBot.DefineTweet("Identity: " + tweet);
            }

            this.NavigatorInput(JSInput); /// Checks from Javascript interpreter.
            return View(this.PageView);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        /* Manual URL entry controls */

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult Projects()
        {
            return View();
        }

        public IActionResult Sourcecode()
        {
            return Redirect("https://github.com/EricDeeTTSTS");
        }
    }
}
