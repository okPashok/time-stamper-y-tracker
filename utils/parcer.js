export const parseBoardContent = async (responseData) => {
    const issues = responseData?.issues || {};
    const assigneeEmail = process.env.EMAIL;
    const statuses = process.env.STATUSES?.split(';') || [];

    const filteredKeys = [];

    for (const issueKey in issues) {
        if (Object.hasOwnProperty.call(issues, issueKey)) {
            const issue = issues[issueKey];
            const email = issue.fields?.assignee?.value?.email;
            const status = issue.fields?.status?.value?.display;

            const isEmailMatch = email === assigneeEmail;
            const isStatusMatch = statuses.length === 0 || statuses.includes(status);

            if (isEmailMatch && isStatusMatch) {
                filteredKeys.push(issueKey);
            }
        }
    }

    return filteredKeys;
};
