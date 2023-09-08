import { Octokit } from '@octokit/rest';
import { promises as fs } from 'fs';
import { join } from 'path';
import unzipper from 'unzipper';
import fetch from 'node-fetch';

export default async function cloneRepo({ personalAccessToken, repo, branch, folderPath }) {
  const octokit = new Octokit({ auth: personalAccessToken });
  const { data } = await octokit.repos.getArchiveLink({ owner: repo.split('/')[0], repo: repo.split('/')[1], archive_format: 'zipball', ref: branch });
  const response = await fetch(data.url);

  if (response.ok) {
    await fs.mkdir(folderPath, { recursive: true });
    await response.body.pipe(unzipper.Extract({ path: process.env.BUCKET_FOLDER_PATH + folderPath }));
    return { success: true };
  } else {
    throw new Error(`Failed to download repo: ${response.statusText}`);
  }
}
