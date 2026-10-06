/*
# Create saved_builds table

## Summary
Stores user-generated PC build configurations created via the Build Wizard.
Builds are intentionally public/shareable — anyone can save a build and view any build.
No user accounts required (single-tenant, anonymous saves).

## New Tables
- `saved_builds`
  - `id` (uuid, primary key) — unique identifier for each build, used in shareable links
  - `build_label` (text) — human-readable tier label (e.g., "Ultra Destroyer")
  - `tier` (text) — performance tier: budget | mid | high | ultra | enthusiast
  - `total_cost` (integer) — estimated total cost in USD
  - `games` (text[]) — array of game IDs the build was optimized for
  - `budget` (integer) — user's selected budget
  - `components` (text[]) — array of component IDs included in the build
  - `created_at` (timestamptz) — timestamp of build creation

## Security
- RLS enabled on saved_builds
- Anon + authenticated can INSERT (anyone can save a build)
- Anon + authenticated can SELECT (anyone can view shared builds)
- Anon + authenticated can DELETE (builds are shareable, removal is open)
- No user_id / ownership tracking — builds are intentionally public and shareable
*/

CREATE TABLE IF NOT EXISTS saved_builds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  build_label text NOT NULL DEFAULT '',
  tier text NOT NULL DEFAULT 'mid',
  total_cost integer NOT NULL DEFAULT 0,
  games text[] NOT NULL DEFAULT '{}',
  budget integer NOT NULL DEFAULT 0,
  components text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE saved_builds ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert a build" ON saved_builds;
CREATE POLICY "Anyone can insert a build"
  ON saved_builds
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can read builds" ON saved_builds;
CREATE POLICY "Anyone can read builds"
  ON saved_builds
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Anyone can delete a build" ON saved_builds;
CREATE POLICY "Anyone can delete a build"
  ON saved_builds
  FOR DELETE
  TO anon, authenticated
  USING (true);
