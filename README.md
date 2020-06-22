# InstalClone
InstaClone App api. The app consists of uploading story with caption, commenting on story, get the paginated stories.

api list
1. Create/Post a story
  api-url : https://abhi-insta.herokuapp.com/api/story/post
  parameter- image- jpeg/png with 1024*1024,
             image- jpeg/png with 1024*1024,
             caption -string,
             storyName - string

2. get paginated post response
   api-url :https://abhi-insta.herokuapp.com/api/story/get/post?page=1&limit=2
       
       paramaters :- page- page no. to visit -> params,
                     limit - set the limit for each page -> params

3. comment on a Post/story
    api-url : https://abhi-insta.herokuapp.com/api/story/comment

    parameters:- storyName- string (name of story to comment on),
                 comment - string(comment to do)