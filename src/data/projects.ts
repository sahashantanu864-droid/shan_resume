export interface ProjectTech {
  name: string;
  category: "backend" | "gis" | "database" | "api" | "devops";
  iconPath?: string;
}

export interface EngineeringHighlight {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  featured: boolean;
  status: string;
  shortDescription: string;
  longDescription: string;
  technologies: ProjectTech[];
  keyFeatures: string[];
  engineeringHighlights: EngineeringHighlight[];
  githubUrl: string;
  demoUrl?: string;
  metrics?: { label: string; value: string }[];
}

export const PROJECTS: Project[] = [
  {
    id: "rakshak-geo",
    title: "RAKSHAK-GEO",
    category: "Geospatial Disaster Response Platform",
    featured: true,
    status: "Active Engineering",
    shortDescription:
      "An AI-powered geospatial flood management and disaster-response platform designed to help authorities monitor floods, assess risk, and coordinate emergency response in real time.",
    longDescription:
      "RAKSHAK-GEO combines satellite-based surface water detection, deterministic spatial vectorization, municipal GIS intersection, and multi-criteria emergency resource allocation into a unified platform. Built with FastAPI and PostGIS, it ingests multi-spectral GeoTIFF satellite rasters, applies McFeeters Normalized Difference Water Index (NDWI) algorithms, subtracts permanent-water baselines, vectorizes flood extents into RFC 7946 GeoJSON polygons with WGS84 geodesic area calculations, and computes response gaps to dynamically dispatch emergency resources.",
    technologies: [
      { name: "Python", category: "backend", iconPath: "/assets/logos/python-mono.svg" },
      { name: "FastAPI", category: "api", iconPath: "/assets/logos/fastapi-mono.svg" },
      { name: "PostGIS / PostgreSQL", category: "database", iconPath: "/assets/logos/postgresql-mono.svg" },
      { name: "Rasterio", category: "gis", iconPath: "/assets/logos/python-mono.svg" },
      { name: "Shapely", category: "gis", iconPath: "/assets/logos/python-mono.svg" },
      { name: "PyProj", category: "gis", iconPath: "/assets/logos/python-mono.svg" },
      { name: "NumPy", category: "backend", iconPath: "/assets/logos/python-mono.svg" },
      { name: "GeoJSON RFC 7946", category: "gis", iconPath: "/assets/logos/hono-mono.svg" },
      { name: "REST APIs", category: "api", iconPath: "/assets/logos/hono-mono.svg" },
      { name: "Docker", category: "devops", iconPath: "/assets/logos/docker-mono.svg" },
    ],
    keyFeatures: [
      "Satellite Ingestion & NDWI Detection: Processes green and near-infrared (NIR) spectral bands using McFeeters formula: (Green - NIR) / (Green + NIR).",
      "Permanent-Water Baseline Masking: Subtracts existing water bodies using deterministic spatial masks to isolate new flood waters.",
      "GeoJSON Vector Extent Extraction: Polygonizes binary flood rasters into RFC 7946 GeoJSON with geodesic (WGS84) and planar (UTM) area calculations.",
      "2D Vector GIS Impact Assessment: Intersects flood polygons with municipal ward boundaries, hospital facilities, and building footprints.",
      "Future Response-Gap Timeline Engine: Deterministic multi-horizon projection analyzing demand vs capacity across 0h, 6h, 12h, 18h, and 24h operational windows.",
      "Emergency Resource Allocation Solver: Multi-criteria solver optimizing allocation of ambulances, rescue boats, food packets, medical kits, and response teams.",
      "What-If Simulation Engine: Evaluates dynamic shifts in regional stockpiles, demand surges, clinic capacity loss, and priority adjustments.",
      "Spatial Database & Backend Architecture: PostGIS database with GiST spatial indexes, typed Pydantic v2 schemas, and asynchronous FastAPI endpoints.",
    ],
    engineeringHighlights: [
      {
        title: "Geospatial Visualization & Vectorization",
        description:
          "Derives affine geotransforms and coordinate reference systems (CRS), vectorizing continuous raster clusters into clean multi-polygon geometries with hole/donut topology preservation.",
      },
      {
        title: "Real-Time Flood Monitoring Pipeline",
        description:
          "5-stage continuous pipeline: Satellite Ingestion -> NDWI Detection -> Permanent Water Subtraction -> Extent Extraction -> GeoJSON Export.",
      },
      {
        title: "Dynamic Ward & Infrastructure Impact",
        description:
          "Performs precise 2D spatial intersections against city administrative zones to classify inundation levels (Unaffected, Low, Moderate, High, Critical) without guesswork.",
      },
      {
        title: "Deterministic Multi-Criteria Solver",
        description:
          "Balances proportional equity and severity priority weighting, guaranteeing non-negativity and stockpile bounds across critical disaster supply distributions.",
      },
      {
        title: "What-If Scenario Simulation",
        description:
          "Simulates disaster conditions with deepcopy state immutability, measuring the exact fulfillment rate shifts and comparative deltas for emergency planners.",
      },
      {
        title: "PostGIS Spatial Database Architecture",
        description:
          "Production SQL schemas with GiST spatial indexes for sub-millisecond bounding box and containment queries across city ward and building datasets.",
      },
    ],
    githubUrl: "https://github.com/Udaysk9999/RAKSHAK-GEO",
    metrics: [
      { label: "Pipeline Stages", value: "5-Stage Engine" },
      { label: "Test Coverage", value: "162/162 Tests Passed" },
      { label: "Spatial Indexing", value: "PostGIS GiST" },
      { label: "Planning Horizons", value: "0h to 24h Projections" },
    ],
  },
];
