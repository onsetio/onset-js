# @onset/node

## 3.0.0

### Major Changes

- Sync the Node SDK with the Onset API reference (https://docs.onset.io/developers/api-reference/introduction):

  - `update()` now sends `PATCH` instead of `PUT`, matching every documented update endpoint (milestones, releases, subscribers, webhooks, incoming webhooks).
  - Renamed `onsetSDK.roadmap` to `onsetSDK.milestones` to match the `/milestones` endpoint. `roadmap` is kept as a deprecated alias for now.
  - Fixed `webhooks.create`/`webhooks.update` payload to send `name` (was incorrectly `title`).
  - `Base` now takes separate create/update payload generics (`Base<T, Q, CreatePayload, UpdatePayload = Partial<CreatePayload>>`) so resources whose PATCH body isn't just "every create field, but optional" can say so precisely: `subscribers.update()` no longer accepts `email` (the API doesn't allow changing it), and `incomingWebhooks.update()` no longer accepts `type` (only `name`/`isEnabled` - `type` is create-only).
  - Renamed `IncomingWebhook` fields to match the API response casing: `is_enabled` -> `isEnabled`, `last_triggered_at` -> `lastTriggeredAt`, `created_at` -> `createdAt`, `updated_at` -> `updatedAt`.
  - Narrowed `Release.status` to `"DRAFT" | "RELEASED"` and added the `summary` field.
  - Added `Milestone.upvote_count`; `slug` is now required (not optional) when creating/updating a milestone, matching the API.
  - `del()` now resolves to `{ success: boolean }` instead of `void`, matching the documented delete response body.
  - Added read-only `onsetSDK.projects`, `onsetSDK.labels`, and `onsetSDK.contributors` resources (`GET /projects`, `GET /labels`, `GET /contributors`). These are list-only reference data referenced by milestones/releases (`project_id`, `label_ids`, `contributor_ids`) - manage the underlying records from the Onset dashboard.
  - Added `onsetSDK.subscriberLists`, a full CRUD resource (`/subscriber-lists`) for managing the lists subscribers can belong to (`list_ids` on `subscribers.create`/`update`). Unlike projects/labels/contributors, this one supports create/update/delete, not just list/retrieve.

## 2.0.2

### Patch Changes

- updated the packages to reflect the new api

## 2.0.1

### Patch Changes

- fix type

## 2.0.0

### Major Changes

- onset 5.0

## 1.1.0

### Minor Changes

- added webhook

### Patch Changes

- Updated dependencies
  - interfaces@1.1.0

## 1.0.0

### Major Changes

- Upgraded to new API version

### Patch Changes

- Updated dependencies
  - interfaces@1.0.0

## 0.2.0

### Minor Changes

- Added roadmap updates

### Patch Changes

- Updated dependencies
  - interfaces@0.1.2

## 0.1.1

### Patch Changes

- Added `roadmap` entity and release `append` method.
- Updated dependencies
  - interfaces@0.1.1

## 0.1.0

### Minor Changes

- New roadmaps feature

### Patch Changes

- Updated dependencies
  - interfaces@0.1.0

## 0.0.4

### Patch Changes

- Updated readme

## 0.0.3

### Patch Changes

- added labels
- Updated dependencies
  - interfaces@0.0.1

## 0.0.2

### Patch Changes

- updated org

## 0.0.1

### Patch Changes

- Initial deploy
