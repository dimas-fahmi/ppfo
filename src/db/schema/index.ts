// Import Models
import { articles } from "./articles";
import { channels } from "./channels";
import { movements, movementMemberships } from "./movements";
import { organizations, organizationMemberships } from "./organizations";
import { profiles } from "./profiles";
import { threads } from "./threads";
import { comments } from "./comments";
import { figures } from "./figures";
import { events, eventActors } from "./events";
import { authUsers } from "drizzle-orm/supabase";

// Export as batch
const schema = {
  // Articles
  articles,

  // Channels
  channels,

  // Comments
  comments,

  // Events
  events,
  eventActors,

  // Figures
  figures,

  // Movements
  movements,
  movementMemberships,

  // Organizations
  organizations,
  organizationMemberships,

  // Profiles
  profiles,

  // Threads
  threads,

  // Supabase [user]
  authUsers,
};

export default schema;
