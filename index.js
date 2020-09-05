const gitlog = require("gitlog").default;

const options = {
    repo: "",
    number: 5000,
    fields: ["subject"],
    after: "2020-07-03",
    execOptions: { maxBuffer: 10000 * 1024 },
};

console.log(process.argv);
options.repo = process.argv[2];


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

console.log(cardIdDistinct.sort().join(" "));

