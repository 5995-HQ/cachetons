from sqlalchemy import Column, Integer, String, Table, ForeignKey, TIMESTAMP, TEXT
from db import Base, relationship


class ConfigBundle(Base):
    __tablename__ = "config_bundle"
    id = Column(Integer, primary_key=True)
    name = Column(String(225))
    radar_id = Column(Integer, nullable=True)
    org = Column(String(225))

    def __init__(self, name, org):
        self.name = name
        self.org = org

    @property
    def to_json(self):
        return {"id": self.id, "name": self.name, "radar_id": self.radar_id, "org": self.org}


class CustomImports(Base):
    __tablename__ = "config_custom_imports"
    id = Column(Integer, primary_key=True)
    description = Column(String(225))
    radar_id = Column(Integer)

    def __init__(self, description, radar_id):
        self.description = description
        self.radar_id = radar_id

    @property
    def to_json(self):
        return {"id": self.id, "description": self.description, "radar_id": self.radar_id}


class ScriptLog(Base):
    __tablename__ = "script_logs"
    id = Column(Integer, primary_key=True)
    script = Column(String(225))
    called_by = Column(String(255))
    payload = Column(TEXT)
    started_at = Column(TIMESTAMP)
    finished_at = Column(TIMESTAMP)

    def __init__(self, script, called_by, payload, started_at):
        self.script = script
        self.called_by = called_by
        self.payload = payload
        self.started_at = started_at

    @property
    def to_json(self):
        return {
            "id": self.id,
            "script": self.script,
            "called_by": self.called_by,
            "payload": self.payload,
            "started_at": self.started_at,
            "finished_at": self.finished_at,
        }


class ForceSync(Base):
    __tablename__ = "forced_syncs"
    id = Column(Integer, primary_key=True)
    query_id = Column(Integer)
    description = Column(String(255))
    status = Column(String(50))
    error_message = Column(TEXT)
    started_at = Column(TIMESTAMP)
    finished_at = Column(TIMESTAMP)

    def __init__(self, query_id, description):
        self.query_id = query_id
        self.description = description

    @property
    def to_json(self):
        return {
            "id": self.id,
            "query_id": self.query_id,
            "description": self.description,
            "status": self.status,
            "error_message": self.error_message,
            "started_at": self.started_at,
            "finished_at": self.finished_at,
        }


config_milestone_translations = Table(
    "config_milestone_translations",
    Base.metadata,
    Column("config_radar_milestone_id", Integer, ForeignKey("config_radar_milestones.id")),
    Column("config_jira_milestone_id", Integer, ForeignKey("config_jira_milestones.id")),
)


class RadarMilestones(Base):
    __tablename__ = "config_radar_milestones"
    id = Column(Integer, primary_key=True)
    name = Column(String(225), unique=True)
    translations = relationship("JiraMilestones", secondary="config_milestone_translations")

    def __init__(self, name):
        self.name = name

    @property
    def to_json(self):
        return {"id": self.id, "name": self.name}


class JiraMilestones(Base):
    __tablename__ = "config_jira_milestones"
    id = Column(Integer, primary_key=True)
    name = Column(String(225), unique=True)

    def __init__(self, name):
        self.name = name

    @property
    def to_json(self):
        return {"id": self.id, "name": self.name}
