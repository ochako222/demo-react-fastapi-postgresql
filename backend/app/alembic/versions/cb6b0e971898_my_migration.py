"""My migration

Revision ID: cb6b0e971898
Revises: 3383089aae4c
Create Date: 2024-09-09 17:44:02.219187+10:00

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cb6b0e971898'
down_revision = '3383089aae4c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_user_slug', table_name='user')
    op.drop_column('user', 'slug')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('slug', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.create_index('ix_user_slug', 'user', ['slug'], unique=False)
    # ### end Alembic commands ###
