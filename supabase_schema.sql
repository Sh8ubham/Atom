-- Supabase Schema for AtomQuest Phase 3 Migration

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('employee', 'manager', 'admin')),
    manager_id TEXT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Goals Table
CREATE TABLE IF NOT EXISTS goals (
    id TEXT PRIMARY KEY,
    employee_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    thrust_area TEXT NOT NULL,
    uom_type TEXT NOT NULL,
    target NUMERIC,
    actual NUMERIC,
    deadline DATE,
    weightage NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'returned')),
    return_reason TEXT,
    locked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Checkins Table
CREATE TABLE IF NOT EXISTS checkins (
    id TEXT PRIMARY KEY,
    goal_id TEXT NOT NULL REFERENCES goals(id) ON DELETE CASCADE,
    employee_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    actual_value NUMERIC NOT NULL,
    score NUMERIC NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Audit Log Table
CREATE TABLE IF NOT EXISTS audit_log (
    id TEXT PRIMARY KEY,
    entity_type TEXT NOT NULL CHECK (entity_type IN ('goal', 'checkin')),
    entity_id TEXT NOT NULL,
    action TEXT NOT NULL CHECK (action IN ('APPROVED', 'RETURNED', 'CREATED', 'UPDATED_POST_LOCK', 'SHARED_CREATED')),
    changed_by TEXT NOT NULL REFERENCES users(id) ON DELETE SET NULL,
    details TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Data (matching the mockDb state)
INSERT INTO users (id, name, email, password, role, manager_id) VALUES
('mgr-1', 'Manager One', 'manager1@atomquest.com', 'password123', 'manager', NULL),
('mgr-2', 'Manager Two', 'manager2@atomquest.com', 'password123', 'manager', NULL),
('admin-1', 'Admin User', 'admin@atomquest.com', 'password123', 'admin', NULL);

INSERT INTO users (id, name, email, password, role, manager_id) VALUES
('emp-1', 'Employee One', 'emp1@atomquest.com', 'password123', 'employee', 'mgr-1'),
('emp-2', 'Employee Two', 'emp2@atomquest.com', 'password123', 'employee', 'mgr-1'),
('emp-3', 'Employee Three', 'emp3@atomquest.com', 'password123', 'employee', 'mgr-2'),
('emp-4', 'Employee Four', 'emp4@atomquest.com', 'password123', 'employee', 'mgr-2');
