from flask import Blueprint, Response, json, request

# from models import ConfigBundle, CustomImports, RadarMilestones, JiraMilestones, ForceSync
import os, base64, requests
from app import app, db_session


apiRoutes = Blueprint("apiRoutes", __name__)

ADMIN_GROUP = os.environ.get("ADMIN_GROUP", "5522236")  # Default to rtw-jira-admins
JIRA_ROBOT_DSID = "2304626799"  # This needs to be of type string
RTW_JIRA_IMPORT_CBG_ID = 2300


def is_admin(user):
    return ADMIN_GROUP in user.get("allGroups", [])


@app.get("/cities/")
def read_item():
    return {"city": ""}


""" You can specify a page number and a subject. Use '+' instead of space. 
 Example: http://127.0.0.1:8000/api/v1/craigslist?page=1&subject=beer+brewing+equipment """


@app.get("/api/v1/{name}")
async def get_name(name, page: int = 0, subject: str = ""):
    headers = {"User-Agent": "Mozilla/5.0"}
    if name == "craigslist":
        full_product = []
        page = page * 120
        image_url = "https://images.craigslist.org/{}_300x300.jpg"
        result_subject = f"https://sfbay.craigslist.org/d/for-sale/search/sss?{page}&query={subject}"
        link = result_subject.replace(" ", "+")

        r = requests.get(link, headers=headers)
        content_lxml = bs(r.content, "lxml")
        content_soup = bs(r.content, "html.parser")
        #  TODO: Regex to find the sku for this site.
        rows = content_soup.find_all("li", class_="result-row")
        list_assets = list(content_lxml.select(".result-image[data-ids]"))
        ids = [item[0]["data-ids"].replace("3:", "") for item in list_assets]
        list_of_images = [image_url.format(j) for i[0] in ids for j in i.split(",")]
        full_product = []
        for item, image in zip(rows, list_of_images):
            price = item.a.text.strip()
            time_meta = item.find("time", class_="result-date")
            time = time_meta["datetime"]
            meta_title = item.find("a", class_="result-title hdrlnk")
            title = meta_title.text
            link_ = meta_title["href"]
            full_product.append(
                dict(
                    image=image,
                    price=price,
                    time=time,
                    title=title,
                    link_=link_,
                    uuid=uuid.uuid1(),
                )
            )
        print(page)
        print(link)
        return {"craigslist_result": [product for product in full_product]}
    if name == "ebay":
        return {"ebay_result": "{}"}


# TODO: Grab a specific item
@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}


@app.get("/user")
def current_user():
    user = dict(nickName="fernando", isAdmin=True)
    return Response(user, status=200, mimetype="application/json")


# # @apiRoutes.route("/bundles", methods=["GET"])
# # def bundle_index():
# #     if not is_admin():
# #         return Response(json.dumps({"message": "Unauthorized"}), status=403, mimetype="application/json")
# #     bundles = json.dumps([b.to_json for b in ConfigBundle.query.all()])
# #     return Response(bundles, status=200, mimetype="application/json")


# @apiRoutes.route("/bundles", methods=["POST"])
# @appleconnect.auth(param="appleconnect_user")
# def bundle_create(appleconnect_user):
#     if not is_admin(appleconnect_user):
#         return Response(json.dumps({"message": "Unauthorized"}), status=403, mimetype="application/json")
#     info = request.get_json()
#     try:
#         bundle = ConfigBundle(info["name"], info["org"])
#         db_session.add(bundle)
#         db_session.commit()
#         status = 200
#         message = bundle.to_json
#     except KeyError as e:
#         status = 400
#         message = dict({"message": "{} was missing from the request".format(e)})

#     return Response(json.dumps(message), status=status, mimetype="application/json")


# @apiRoutes.route("/custom-imports", methods=["GET"])
# @appleconnect.auth(param="appleconnect_user")
# def custom_import_index(appleconnect_user):
#     if not is_admin(appleconnect_user):
#         return Response(json.dumps({"message": "Unauthorized"}), status=403, mimetype="application/json")
#     imports = json.dumps([b.to_json for b in CustomImports.query.all()])
#     return Response(imports, status=200, mimetype="application/json")


# @apiRoutes.route("/custom-imports", methods=["POST"])
# @appleconnect.auth(param="appleconnect_user")
# def custom_import_create(appleconnect_user):
#     if not is_admin(appleconnect_user):
#         return Response(json.dumps({"message": "Unauthorized"}), status=403, mimetype="application/json")
#     info = request.get_json()
#     try:
#         custom_import = CustomImports(info["description"], info["radar_id"])
#         db_session.add(custom_import)
#         db_session.commit()
#         status = 200
#         message = custom_import.to_json
#     except KeyError as e:
#         status = 400
#         message = dict({"message": "{} was missing from the request".format(e)})

#     return Response(json.dumps(message), status=status, mimetype="application/json")


# @apiRoutes.route("/milestone-translations", methods=["GET"])
# @appleconnect.auth(param="appleconnect_user")
# def milestone_translation_index(appleconnect_user):
#     if not is_admin(appleconnect_user):
#         return Response(json.dumps({"message": "Unauthorized"}), status=403, mimetype="application/json")
#     radar_milestones = json.dumps(
#         [dict(b.to_json, translations=[i.to_json for i in b.translations]) for b in RadarMilestones.query.all()]
#     )
#     return Response(radar_milestones, status=200, mimetype="application/json")


# @apiRoutes.route("/milestone-translations", methods=["POST"])
# @appleconnect.auth(param="appleconnect_user")
# def radar_milestone_create(appleconnect_user):
#     if not is_admin(appleconnect_user):
#         return Response(json.dumps({"message": "Unauthorized"}), status=403, mimetype="application/json")
#     info = request.get_json()
#     try:
#         radar_milestone = RadarMilestones(info["name"])
#         db_session.add(radar_milestone)
#         db_session.commit()
#         status = 200
#         message = dict(radar_milestone.to_json, translations=[i.to_json for i in radar_milestone.translations])
#     except KeyError as e:
#         status = 400
#         message = dict({"message": "{} was missing from the request".format(e)})

#     return Response(json.dumps(message), status=status, mimetype="application/json")


# @apiRoutes.route("/milestone-translations/<radar_id>/translations", methods=["POST"])
# @appleconnect.auth(param="appleconnect_user")
# def radar_translation_create(radar_id, appleconnect_user):
#     if not is_admin(appleconnect_user):
#         return Response(json.dumps({"message": "Unauthorized"}), status=403, mimetype="application/json")

#     info = request.get_json()

#     try:
#         check = JiraMilestones.query.filter_by(name=info["name"]).first()
#         if check:
#             translation = check
#         else:
#             translation = JiraMilestones(info["name"])
#             db_session.add(translation)
#             db_session.commit()

#         radar_milestone = RadarMilestones.query.get(radar_id)
#         radar_milestone.translations.append(translation)
#         db_session.add(radar_milestone)
#         db_session.commit()
#         status = 200
#         message = dict(radar_milestone.to_json, translations=[i.to_json for i in radar_milestone.translations])

#     except KeyError as e:
#         status = 400
#         message = dict({"message": "{} was missing from the request".format(e)})

#     return Response(json.dumps(message), status=status, mimetype="application/json")


# @apiRoutes.route("/milestone-translations/<radar_id>/translations/<translation_id>", methods=["DELETE"])
# @appleconnect.auth(param="appleconnect_user")
# def radar_translation_delete(radar_id, translation_id, appleconnect_user):
#     if not is_admin(appleconnect_user):
#         return Response(json.dumps({"message": "Unauthorized"}), status=403, mimetype="application/json")

#     try:
#         translation = JiraMilestones.query.get(translation_id)
#         radar_milestone = RadarMilestones.query.get(radar_id)

#         radar_milestone.translations.remove(translation)
#         db_session.add(radar_milestone)
#         db_session.commit()
#         status = 200
#         message = dict(radar_milestone.to_json, translations=[i.to_json for i in radar_milestone.translations])

#     except KeyError as e:
#         status = 400
#         message = dict({"message": "{} was missing from the request".format(e)})

#     return Response(json.dumps(message), status=status, mimetype="application/json")


# @apiRoutes.route("/forced-syncs", methods=["GET"])
# def forced_syncs_index():
#     syncs = json.dumps([b.to_json for b in ForceSync.query.order_by(ForceSync.id.desc())])
#     return Response(syncs, status=200, mimetype="application/json")


# @apiRoutes.route("/check/radar", methods=["GET"])
# @appleconnect.auth(param="appleconnect_user")
# def check_if_radar_works(appleconnect_user):
#     if not is_admin(appleconnect_user):
#         return Response(json.dumps({"message": "Unauthorized"}), status=403, mimetype="application/json")

#     system_identifier = ClientSystemIdentifier("SyncherUI", "1.0")
#     radar_user = os.environ.get("RADAR_USER")
#     radar_pass = os.environ.get("RADAR_PASSWORD")
#     radar_client = RadarClient(
#         AuthenticationStrategyWebCookie(appleconnect_username=radar_user, appleconnect_password=radar_pass),
#         system_identifier,
#     )
#     radar = radar_client.radar_for_id(47614820)
#     if radar:
#         message = dict(up=True)
#     else:
#         message = dict(up=False)

#     return Response(json.dumps(message), status=200, mimetype="application/json")


# @apiRoutes.route("/check/jira", methods=["GET"])
# @appleconnect.auth(param="appleconnect_user")
# def check_if_jira_works(appleconnect_user):
#     if not is_admin(appleconnect_user):
#         return Response(json.dumps({"message": "Unauthorized"}), status=403, mimetype="application/json")

#     auth = base64.b64encode(os.environ.get("JIRA_USER") + ":" + os.environ.get("JIRA_PASSWORD"))
#     response = requests.get(
#         "https://rtw.sd.apple.com/rest/api/2/search?jql=project+%3D+RP+AND+createdDate+%3E+-5m+OR+updatedDate+%3E+-5m+ORDER+BY+updated+DESC&fields=*none&maxResults=0",
#         headers={"Authorization": "Basic " + auth, "Content-Type": "application/json"},
#     )
#     jira = response.json()
#     if jira.get("total", 0) > 100:
#         message = dict(up=True, total=jira.get("total"))
#     else:
#         message = dict(up=False)

#     return Response(json.dumps(message), status=200, mimetype="application/json")


# @apiRoutes.route("/check/confluence", methods=["GET"])
# @appleconnect.auth(param="appleconnect_user")
# def check_if_confluence_works(appleconnect_user):
#     if not is_admin(appleconnect_user):
#         return Response(json.dumps({"message": "Unauthorized"}), status=403, mimetype="application/json")

#     auth = base64.b64encode(os.environ.get("CONFLUENCE_USER") + ":" + os.environ.get("CONFLUENCE_PASSWORD"))
#     response = requests.get(
#         "https://confluence.sd.apple.com/rest/api/content/279061031/child/page?limit=100",
#         headers={"Authorization": "Basic " + auth, "Content-Type": "application/json"},
#     )

#     if response.status_code == 200:
#         conf = response.json()
#         if conf.get("size", 0) > 0:
#             message = dict(up=True, total=conf.get("size"))
#     else:
#         message = dict(up=False)

#     return Response(json.dumps(message), status=200, mimetype="application/json")


# @apiRoutes.route("/verify-bundle", methods=["GET"])
# @appleconnect.auth(param="appleconnect_user")
# def verify_component_config(appleconnect_user):
#     name = request.args.get("name")
#     version = request.args.get("version")
#     system_identifier = ClientSystemIdentifier("SyncherUI", "1.0")
#     radar_user = os.environ.get("RADAR_USER")
#     radar_pass = os.environ.get("RADAR_PASSWORD")
#     radar_client = RadarClient(
#         AuthenticationStrategyWebCookie(appleconnect_username=radar_user, appleconnect_password=radar_pass),
#         system_identifier,
#         protocol_version="pre-release",
#     )
#     # Check if Jira Robot can read this component.
#     component_query = {
#         "component": {
#             "name": "{}".format(name),
#             "version": "{}".format(version),
#         },
#     }
#     # Check if this component is inside RTW Jira Import CBG (Component Bundle Group) and Radars.
#     cbg_query = {
#         "componentBundleGroupId": {"eq": RTW_JIRA_IMPORT_CBG_ID},
#         "component": {
#             "eq": {"name": "{}".format(name), "version": "{}".format(version), "includeSubcomponents": False}
#         },
#     }

#     # Here I run a query against the Radar API for component results.
#     # component_query_results checks against the component provided and returns one Radar.
#     component_query_results = [i.id for i in radar_client.find_radars(component_query, limit=1)]

#     # cbg_query_results checks to see if this component is in the RTW Jira Import Component Bundle Group and returns one Radar.
#     cbg_query_results = [i.id for i in radar_client.find_radars(cbg_query, limit=1)]

#     # If the results come back as 0 for either one, chances are Jira Robot can't read it.
#     if len(component_query_results) > 0 and len(cbg_query_results) > 0:
#         # If both return results and are pointing to the same Radar, then assign the first one to radar_to_check.
#         radar_to_check = component_query_results[0]

#         # Run the Radar API call to check Jira Robot's permissions against the radar_to_check
#         # I capture the 'status' here so that the 'info' variable doesn't look like: info[0][1]['privilege']
#         # More info on this API call: https://radar.apple.com/developer/api/documentation/latest/person-apis#get-user-problem-privileges
#         status, info = radar_client.build_and_send_request(("security", JIRA_ROBOT_DSID, "problems", radar_to_check))
#         access_level = info[0]["privilege"]
#         message = {"status": True, "message": "Jira Robot access level: {}".format(access_level)}

#     elif len(component_query_results) > 0 and len(cbg_query_results) == 0:
#         message = {"status": False, "message": "This component is not in the RTW Jira Import Component Bundle Group"}

#     else:
#         message = {"status": False, "message": "Jira Robot can't access this Component or it does not exist."}
#     return Response(json.dumps(message), status=200, mimetype="application/json")
