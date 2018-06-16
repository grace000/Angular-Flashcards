"""add long_description to cards

Revision ID: 29703710db4b
Revises: 
Create Date: 2018-06-12 13:13:36.354268

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '29703710db4b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('flashcards', sa.Column(
        'long_description',
        sa.Text,
        nullable=False,
        server_default='Default flashcard description'))


def downgrade():
    pass
