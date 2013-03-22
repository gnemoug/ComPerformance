# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'ComperformanceScore.assessmentscore'
        db.add_column(u'comperformancescore', 'assessmentscore',
                      self.gf('django.db.models.fields.FloatField')(default=1),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting field 'ComperformanceScore.assessmentscore'
        db.delete_column(u'comperformancescore', 'assessmentscore')


    models = {
        'auth.group': {
            'Meta': {'object_name': 'Group'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        'auth.permission': {
            'Meta': {'ordering': "('content_type__app_label', 'content_type__model', 'codename')", 'unique_together': "(('content_type', 'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['contenttypes.ContentType']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Group']", 'symmetrical': 'False', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        },
        'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        'engine.assessment': {
            'Meta': {'object_name': 'Assessment', 'db_table': "u'assessment'"},
            'begindate': ('django.db.models.fields.DateField', [], {}),
            'enddate': ('django.db.models.fields.DateField', [], {}),
            'excellent': ('django.db.models.fields.IntegerField', [], {}),
            'good': ('django.db.models.fields.IntegerField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'ordinary': ('django.db.models.fields.IntegerField', [], {}),
            'term': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '16'})
        },
        'engine.assessmentrecord': {
            'Meta': {'object_name': 'AssessmentRecord', 'db_table': "u'assessmentrecord'"},
            'assessment': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['engine.Assessment']"}),
            'dstudent': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'dstuent'", 'to': "orm['engine.Student']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'ostudent': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'ostuent'", 'to': "orm['engine.Student']"}),
            'result': ('django.db.models.fields.CharField', [], {'max_length': '1'})
        },
        'engine.assessmentrow': {
            'Meta': {'object_name': 'AssessmentRow', 'db_table': "u'assessmentrow'"},
            'assessment': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['engine.Assessment']"}),
            'excellent': ('django.db.models.fields.IntegerField', [], {}),
            'good': ('django.db.models.fields.IntegerField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'ordinary': ('django.db.models.fields.IntegerField', [], {}),
            'student': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['engine.Student']"})
        },
        'engine.behavior': {
            'Meta': {'object_name': 'Behavior', 'db_table': "u'behavior'"},
            'actlevel': ('django.db.models.fields.CharField', [], {'max_length': '1'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '16'})
        },
        'engine.class': {
            'Meta': {'object_name': 'Class', 'db_table': "u'class'"},
            'classid': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '10'}),
            'classname': ('django.db.models.fields.CharField', [], {'max_length': '20'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        'engine.comperformance': {
            'Meta': {'object_name': 'Comperformance', 'db_table': "u'comperformance'"},
            'behavior': ('django.db.models.fields.FloatField', [], {}),
            'behaviorup': ('django.db.models.fields.FloatField', [], {}),
            'development': ('django.db.models.fields.FloatField', [], {}),
            'excellent': ('django.db.models.fields.FloatField', [], {}),
            'good': ('django.db.models.fields.FloatField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'moral': ('django.db.models.fields.FloatField', [], {}),
            'ordinary': ('django.db.models.fields.FloatField', [], {}),
            'physical': ('django.db.models.fields.FloatField', [], {}),
            'term': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '16'})
        },
        'engine.comperformancebehaviorscore': {
            'Meta': {'object_name': 'ComperformanceBehaviorScore', 'db_table': "u'comperformancebehaviorscore'"},
            'behavior': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['engine.Behavior']"}),
            'comperformance': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['engine.Comperformance']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'score': ('django.db.models.fields.FloatField', [], {}),
            'student': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['engine.Student']"})
        },
        'engine.comperformancedevelopmentscore': {
            'Meta': {'object_name': 'ComperformanceDevelopmentScore', 'db_table': "u'comperformancedevelopmentscore'"},
            'comperformance': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['engine.Comperformance']"}),
            'development': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['engine.Development']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'score': ('django.db.models.fields.FloatField', [], {}),
            'student': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['engine.Student']"})
        },
        'engine.comperformancephysicalscore': {
            'Meta': {'object_name': 'ComperformancePhysicalScore', 'db_table': "u'comperformancephysicalscore'"},
            'comperformance': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['engine.Comperformance']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'score': ('django.db.models.fields.FloatField', [], {}),
            'student': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['engine.Student']"})
        },
        'engine.comperformancescore': {
            'Meta': {'object_name': 'ComperformanceScore', 'db_table': "u'comperformancescore'"},
            'assessmentscore': ('django.db.models.fields.FloatField', [], {}),
            'comperformance': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['engine.Comperformance']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'score': ('django.db.models.fields.FloatField', [], {}),
            'student': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['engine.Student']"})
        },
        'engine.development': {
            'Meta': {'object_name': 'Development', 'db_table': "u'development'"},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '11'}),
            'parent': ('django.db.models.fields.CharField', [], {'max_length': '1', 'null': 'True', 'blank': 'True'})
        },
        'engine.grade': {
            'Meta': {'object_name': 'Grade', 'db_table': "u'grade'"},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'score': ('django.db.models.fields.FloatField', [], {}),
            'student': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['engine.Student']"}),
            'term': ('django.db.models.fields.CharField', [], {'max_length': '16'})
        },
        'engine.student': {
            'Meta': {'object_name': 'Student', 'db_table': "u'student'"},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'realname': ('django.db.models.fields.CharField', [], {'max_length': '16'}),
            'sex': ('django.db.models.fields.CharField', [], {'max_length': '1'}),
            'theclass': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['engine.Class']"}),
            'user': ('django.db.models.fields.related.OneToOneField', [], {'to': "orm['auth.User']", 'unique': 'True'})
        }
    }

    complete_apps = ['engine']