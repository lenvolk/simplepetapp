use agent mode with Claude Opus 4.5 model selected
attach idea.txt to the chat and prompt: 
"I want you to create a PRD for the main idea.txt file in
the repo, put it in a PRD.md file in the root, and then
implement the entire app with mock data. I want you to
build out the entire website as fully featured as
possible, go to town. Here is some general guidance
for the website design, use C# and Blazor best
practices wherever possible"


To execute: 
cd c:\Temp\GIT\simkplepetapp\MyPetVenues

dotnet run --urls "http://localhost:5050"


===== Dev Container GO
@workspace /explain this project

let's add a new get route to export and display the environment i am running on

#file:devcontainer.json  what other customizations for the dev container should i have based on this project