const gitlog = require("gitlog").default;

const options = {
    repo: "",
    number: 5000,
    fields: ["subject"],
    execOptions: { maxBuffer: 10000 * 1024 },
};

if (process.argv.length <= 2) {
    console.log("try: \nnode index.js <path-of-git-repo> PH 2020-01-01\n");
    console.log("for extract card Id in commit message after '2020-01-01' with message which contains 'PH' from git repository in <path-of-git-repo>\n");

    process.exit();
}
//console.log(process.argv);

options.repo = process.argv[2];
options.after = process.argv[4];


//console.log(options);
// Synchronous
const commits = gitlog(options);
const messageFilter = process.argv[3];

var cardIdDistinct = [];
var phCommits = commits.filter(commit => commit.subject.includes(messageFilter));
const grepId = /\[(\d*)\]/;
phCommits.reduce((cardIdList, commit) => {
    const parseId = grepId.exec(commit.subject);
    if (parseId != null) {
        var listCardIds = parseId[1];
        if (!cardIdList.includes(listCardIds)) {
            cardIdList.push(listCardIds);
        }
    }
    return cardIdList;
    //console.log(listCardIds[0]);
}, cardIdDistinct);

console.log("\nFounded " + cardIdDistinct.length + " cardId.\n")
console.log(cardIdDistinct.sort().join(","));

console.log("\nCopy a past the list in filter box of trello to see the complete list of cards.");

