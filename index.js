const gitlog = require("gitlog").default;

const options = {
    repo: __dirname + "/gitRepoPhoenix",
    number: 5000,
    fields: ["subject"],
    after: "2020-07-03",
    execOptions: { maxBuffer: 10000 * 1024 },
};

// Synchronous
const commits = gitlog(options);
var cardIdDistinct = [];
var phCommits = commits.filter(commit => commit.subject.includes("PH ["));
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

