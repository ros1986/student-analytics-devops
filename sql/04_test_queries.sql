-- Test 1: Check if analytics view exists
SELECT COUNT(*) AS ViewExists
FROM INFORMATION_SCHEMA.VIEWS
WHERE TABLE_NAME = 'StudentAnalyticsView';

-- Test 2: Validate analytics output
SELECT *
FROM StudentAnalyticsView;

-- Test 3: Ensure no NULL risk classification
SELECT Name, RiskLevel
FROM StudentAnalyticsView
WHERE RiskLevel IS NULL;

