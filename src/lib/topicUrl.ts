// Topic keys vs public paths.
//
// A topic's stable key is its frontmatter `slug` (or file slug). Client `topics:`
// lists, presenter assignments and the access-window registry all use the key.
// The public path adds the optional `urlSuffix`, which the rotation script
// (~/claude-code/scripts/access-windows/rotate-topic.mjs) changes when a
// workshop's access lapses, so saved links to the old path stop working.
// Every topic link and topic page path must come from here.

interface TopicLike {
  slug: string;
  data: { slug?: string; urlSuffix?: string | null };
}

export function topicKey(topic: TopicLike): string {
  return topic.data.slug || topic.slug;
}

// Path segment under /resources/: `<key>` or `<key>-<urlSuffix>`.
export function topicPathSlug(topic: TopicLike): string {
  const key = topicKey(topic);
  return topic.data.urlSuffix ? `${key}-${topic.data.urlSuffix}` : key;
}

export function topicPath(topic: TopicLike): string {
  return `/resources/${topicPathSlug(topic)}`;
}
