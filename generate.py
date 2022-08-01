#-- generate.py ---------------------------------------------------------------
# Copyright (C) 2022 pillager86
# 
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
# 
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
# 
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>
#-----------------------------------------------------------------------------
# Python script that uses the trained and finetuned model to generate
# Eminem lyrics with the aitextgen tool.
from aitextgen import aitextgen

ai = aitextgen(model_folder="trained_model")

ai.generate(1)

