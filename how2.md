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


#promptBoost I want you to start the application, use #chrome-devtools to test all the navigation flows for the website. Provide your findings in the report which would be saved in the root of this repo named ReportTesting.md add some logical flow by using mermaid diagram

#promptBoost Test all user-facing forms in the app using realistic fake data. Submit each form and verify that the expected confirmation or response is correctly delivered via email. Report missing emails, incorrect content, delays, or broken submission flows. Raise the critical bugs in the connected jira account

Come up with a test plan to test this app and do it every week on Monday at 9 AM IST. Act as different user roles (for example: admin and standard user) and test the app end to end. Verify that permissions are enforced correctly for each role. Check all visible images and links across the app and report any broken, inaccessible, or incorrectly permissioned resources.

===
/playwright-test-report start this application and test the most critical user workflows using Playwright MCP and create report at the root of this repository in the folder named "Report"
