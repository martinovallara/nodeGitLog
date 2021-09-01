const gitlog = require("gitlog").default;
var argv = require('minimist')(process.argv.slice(2), { stopEarly: true });

console.log(argv);

const options = {
    repo: "",
    number: 5000,
    fields: ["subject", "hash", "authorDate", "committerDate"],
};


options.repo = argv.repo;
options.after = argv.after;

console.log(options);


const commits = gitlog(options);
const messageFilter = argv.messageFilter;
const grepId = new RegExp(argv.grepExpression) ?? /#(\d*)/;

var cardIdDistinct = [];
var filterdCommits = commits;
if (!!messageFilter) filterdCommits = commits.filter(commit => commit.subject.includes(messageFilter));

filterdCommits.reduce((cardIdList, commit) => {
    const parseId = grepId.exec(commit.subject);
    if (parseId != null) {
        var listCardIds = parseId[1];
        if (!cardIdList.includes(listCardIds)) {
            cardIdList.push(listCardIds);
        }
    }
    return cardIdList;
}, cardIdDistinct);

console.log("\nFounded " + cardIdDistinct.length + " cardId.\n")
console.log(cardIdDistinct.sort().join(","));

console.log("\nCopy a past the list in filter box of trello to see the complete list of cards.");

var filesDistinct = [];
filterdCommits.reduce((filesDistinct, commit) => {
    committedFiles = commit.files;
    committedFiles.forEach(f => {
        if (!filesDistinct.includes(f)) {
            filesDistinct.push(f);
        }
    })
    return filesDistinct;
}, filesDistinct);

console.log("\n===== LIST OF COMMITTED FILES: '" + filesDistinct.length + "'  ================ \n\n");
console.log(filesDistinct.sort());

console.log("\n===== LIST OF COMMIT WITH CONTAINS '" + messageFilter + "'  ================ \n\n");
filterdCommits.forEach(c => {
    console.log([c.hash, c.authorDate, c.commitDate].join(" "));
});