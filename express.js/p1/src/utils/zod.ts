// src/utils/zod.ts
import { ZodError } from 'zod';

export function fieldErrorsFromIssues(err: ZodError): Record<string, string[]> {
    return err.issues.reduce((acc, issue) => {
        const key = issue.path.length ? String(issue.path[0]) : '_form';
        (acc[key] ||= []).push(issue.message);
        return acc;
    }, {} as Record<string, string[]>);
}
