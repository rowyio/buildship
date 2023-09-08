import {
    Octokit
} from '@octokit/rest';
export default async function appendLabelsGithubPR({
    token,
    owner,
    repo,
    issue_number,
    labels
}) {
    const octokit = new Octokit({
        auth: token
    });
    const issue = await octokit.rest.issues.get({
        owner,
        repo,
        issue_number
    });
    const currentLabels = issue.data.labels.map(label => label.name);
    const newLabels = [...currentLabels, ...labels];
    await octokit.rest.issues.update({
        owner,
        repo,
        issue_number,
        labels: newLabels
    });
}
