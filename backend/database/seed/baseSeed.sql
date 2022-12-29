--	SETUP
DROP DATABASE IF EXISTS sb_50_capstone_project_shortcollabs;
CREATE DATABASE sb_50_capstone_project_shortcollabs;
\c sb_50_capstone_project_shortcollabs;


\i schemaSeed.sql
\i contentSeed.sql