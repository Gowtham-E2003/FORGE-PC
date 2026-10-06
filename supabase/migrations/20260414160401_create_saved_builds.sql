/*
  # Create saved_builds table

  ## Summary
  Stores user-generated PC build configurations created via the Build Wizard.

  ## New Tables
  - `saved_builds`
    - `id` (uuid, primary key) — unique identifier for each build
    - `build_label` (text) — human-readable tier label (e.g., "Ultra Destroyer")
    - `tier` (text) — performance tier: budget | mid | high | ultra | enthusiast
    - `total_cost` (int) — estimated total cost in USD
    - `games` (text[]) — array of game IDs the build was optimized for
    - `budget` (int) — user's selected budget
    - `components` (text[]) — array of component IDs included in the build
    - `created_at` (timestamptz) — timestamp of build creation

  ## Security
  - RLS enabled; anyone can insert (anonymous saves) and read builds
  - No user ownership tracking on purpose — builds are shareable by default
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

CREATE POLICY "Anyone can insert a build"
  ON saved_builds
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read builds"
  ON saved_builds
  FOR SELECT
  TO anon, authenticated
  USING (true);
