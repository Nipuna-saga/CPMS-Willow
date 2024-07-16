from sqlalchemy.orm import Session
from db.models.project import Project, Site, ProjectPhase

def create_initial_data(db: Session):
    # Check if data already exists
    print("data loading.....")
    if db.query(Project).first():
        return

    # Create initial projects and sites
    project1 = Project(
        name="Mario Kart Racing Circuits",
        description="Designing and constructing themed tracks for exciting races in the Mario Kart universe.",
        phase=ProjectPhase.STRUCTURAL_CONSTRUCTION,
        latitude=34.6679417,
        longitude=135.4305455
    )
    site1 = Site(
        name="Moo Moo Meadows",
        description="A countryside track featuring rolling hills, barns, and Moo Moo cows, providing a scenic and pastoral racing experience.",
        latitude=34.6678123,
        longitude=135.4309874,
        project=project1
    )
    site2 = Site(
        name="Bowser's Castle",
        description="A treacherous track within Bowser's fortress, featuring lava pools, Thwomps, and sharp turns.",
        latitude=34.6677662,
        longitude=135.4306112,
        project=project1
    )

    project2 = Project(
        name="Hobbiton Village Construction",
        description="Hobbiton is a well-developed community with multiple iconic sites, each contributing to the overall charm and functionality of the village as depicted in J.R.R. Tolkien's beloved works.",
        phase=ProjectPhase.SITE_PREPARATION,
        latitude=-37.8722,
        longitude=175.6820
    )
    site3 = Site(
        name="Bag End",
        description="The home of Bilbo and later Frodo Baggins, located at the end of Bagshot Row. It is a large, comfortable hobbit hole with a distinctive round green door.",
        latitude=-37.85749,
        longitude=175.67983,
        project=project2
    )

    # Add projects and sites to the session
    db.add(project1)
    db.add(site1)
    db.add(site2)
    db.add(project2)
    db.add(site3)

    # Commit the transaction
    db.commit()
