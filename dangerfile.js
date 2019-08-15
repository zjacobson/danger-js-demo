import {message, danger} from "danger"

const reviewersCount = danger.github.requested_reviewers.users.length
if (reviewersCount === 0) {
  warn(`🕵 Whoops, I don't see any reviewers. Remember to add one.`)
} else if (reviewersCount > 1) {
  warn(
    `It's great to have ${reviewersCount} reviewers. Remember though that more than 1 reviewer may lead to uncertainty as to who is responsible for the review.`
  )
}

const labels = danger.github.issue.labels
findName = function(name) {
  return label.name == name
}
if (labels.length == 0) {
  warn("Don't forget to add PMBC or NonPMBC when the build passes")
} else {
  console.log(labels)
}
if(labels.find(label => label.name === "PMBC")) {
  message("Waiting for Pre Merge Beta Check... 😴")
}
else if(labels.find(label => label.name === "NonPMBC")) {
  warn("🕵️ Skipping Pre Merge Beta Check... are you sure about that?")
}

const prTitle = danger.github.pr.title
const ticketPattern = /\[[A-Z]{2,4}-\d{1,5}\]/g
if (!ticketPattern.test(prTitle)) {
  fail("🔍 I can't find the Jira ticket number in the PR title. Expecting to find the pattern \[[A-Z]{2,4}-\d+\]")
}

const prBody = danger.github.pr.body
const ticketUrlPattern = /https:\/\/venmoinc\.atlassian\.net\/browse\/[A-Z]{2,4}-\d+/g
if (!ticketUrlPattern.test(prBody)) {
  fail(
    "🔍 I can't find the Jira ticket URL in the PR body. Please add a link to the Jira ticket, it's the most efficient way to jump to the corresponding ticket in Jira 🏎"
  )
}

if (danger.github.pr.deletions > danger.github.pr.additions) {
  message(
    `👏 Great job! I see more lines deleted than added. Thanks for keeping us lean!`
  )
}

console.log("modified files diffs:")
danger.git.modified_files.map(f => danger.git.diffForFile(f).then(function(diff) {
  console.log(diff)
}))

//danger.git.created_files
      //.concat(danger.git.modified_files)
      //.concat(danger.git.deleted_files)
      //.map(p => danger.git.diffForFile(p).then(function(diff) {
                                              //console.log(diff)
      //}))
