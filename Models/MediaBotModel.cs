using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Timers;
using TweetSharp;

namespace EricDeeTTSTS
{
    public class MediaBotModel : TwitterService
    {
        public MediaBotModel(string consumerKey, string consumerKeySecret, string accessToken, string accessTokenSecret)
            : base(consumerKey, consumerKeySecret, accessToken, accessTokenSecret)
        {
        }

        public void DefineTweet(string stringCommand)
        {
            this.PostTweet(stringCommand);
        }

        public void PostTweet(string newStatus)
        {
            this.SendTweet(new SendTweetOptions { Status = newStatus }, (tweet, response) =>
            {
            });
        }
    }
}
