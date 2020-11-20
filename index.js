const gitlog = require("gitlog").default;
var argv = require('minimist')(process.argv.slice(2), { stopEarly: true });

console.log(argv);

const options = {
    repo: "",
    number: 5000,
    fields: ["subject", "hash", "authorDate", "committerDate"],
    /*
    execOptions: { maxBuffer: 10000 * 1024 },
    */
};


/*
if (argv._.length > 0) {
    console.log("try: \nnode index.js <path-of-git-repo> PH 2020-01-01\n");
    console.log("for extract card Id in commit message after '2020-01-01' with message which contains 'PH' from git repository in <path-of-git-repo>\n");

    process.exit();
}
*/
options.repo = argv.repo;
options.after = argv.after;

console.log(options);


const commits = gitlog(options);
const messageFilter = argv.messageFilter;
const hash = argv.hash;

var cardIdDistinct = [];
var filterdCommits = commits.filter(commit => commit.subject.includes(messageFilter));
const grepId = /\[(\d*)\]/;
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
    console.log(commit.files);
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